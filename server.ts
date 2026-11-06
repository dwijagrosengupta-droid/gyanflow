import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { PDFParse } from "pdf-parse";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "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";
const OPENROUTER_MODEL = "openai/gpt-4o-mini";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

async function callOpenRouter(prompt: string): Promise<string | null> {
  try {
    console.log("Calling OpenRouter with model:", OPENROUTER_MODEL);
    const response = await fetch(OPENROUTER_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://gyanflow.vercel.app",
        "X-Title": "GyanFlow",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenRouter API error:", response.status, errBody);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() ?? null;
    if (content) {
      console.log("OpenRouter response received (length:", content.length, ")");
      console.log("First 300 chars of response:", content.substring(0, 300));
    }
    return content;
  } catch (err) {
    console.error("OpenRouter call failed:", err);
    return null;
  }
}

function stripMarkdownFences(text: string): string {
  text = text.trim();
  if (text.startsWith("```json")) {
    text = text.substring(7);
  } else if (text.startsWith("```")) {
    text = text.substring(3);
  }
  if (text.endsWith("```")) {
    text = text.slice(0, -3);
  }
  return text.trim();
}

function extractJsonFromString(text: string): any {
  const stripped = stripMarkdownFences(text);

  let start = stripped.indexOf("{");
  if (start === -1) {
    throw new Error("No JSON object found in response");
  }

  let depth = 0;
  let end = -1;
  let inString = false;
  let escapeNext = false;

  for (let i = start; i < stripped.length; i++) {
    const char = stripped[i];
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === "\\") {
      escapeNext = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error("Unbalanced JSON braces in response");
  }

  const jsonStr = stripped.substring(start, end + 1).trim();
  return JSON.parse(jsonStr);
}

async function fetchPdfText(pdfUrl: string): Promise<string | null> {
  try {
    console.log("Fetching PDF from:", pdfUrl);
    const response = await fetch(pdfUrl, {
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.warn("Failed to fetch PDF:", response.status);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    console.log("PDF fetched successfully, size:", arrayBuffer.byteLength, "bytes");
    const data = new Uint8Array(arrayBuffer);
    const pdf = new PDFParse({ data });
    const result = await pdf.getText();
    console.log("PDF text extracted, length:", result.text?.length);
    return result.text || null;
  } catch (err: any) {
    if (err.name === "TimeoutError" || err.name === "AbortError") {
      console.warn("PDF fetch timed out after 15 seconds");
    } else {
      console.error("PDF fetch/parse error:", err);
    }
    return null;
  }
}

function extractModuleText(fullText: string, moduleName: string): string {
  const lines = fullText.split("\n");
  const lowerModule = moduleName.toLowerCase();
  let startIndex = -1;
  let endIndex = lines.length;

  console.log(`Extracting module text for: "${moduleName}", full text lines:`, lines.length);

  for (let i = 0; i < lines.length; i++) {
    const lowerLine = lines[i].toLowerCase().trim();
    if (startIndex === -1 && (lowerLine.includes(lowerModule))) {
      startIndex = i;
    } else if (startIndex !== -1 && lowerLine.match(/^chapter\s+\d+/)) {
      endIndex = i;
      break;
    }
  }

  if (startIndex === -1) {
    console.warn(`Module "${moduleName}" not found in PDF text, using first 8000 chars`);
    return fullText.slice(0, 8000);
  }

  const extracted = lines.slice(startIndex, endIndex).join("\n");
  console.log(`Extracted ${extracted.length} chars for module "${moduleName}"`);
  if (extracted.length > 8000) {
    return extracted.slice(0, 8000);
  }
  return extracted;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI client if GEMINI_API_KEY is available
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.warn("Gemini client initialization failed, fallback will be used:", err);
    }
  }

  // API Endpoint: Get AI Adaptive Hint
  app.post("/api/ai/hint", async (req, res) => {
    try {
      const { question, options, language, difficulty } = req.body;

      if (ai) {
        const prompt = `You are a friendly, encouraging AI tutor for grade school students in India learning under the GyanFlow platform.
The student is stuck on a question in ${language || "English"}.
Question: "${question}"
Options: ${JSON.stringify(options)}
Current Difficulty: Level ${difficulty || 3}.

Provide a subtle, helpful hint (1-2 sentences maximum) without directly giving away the answer. Respond in ${language || "English"}.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
        });

        if (response.text) {
          return res.json({ hint: response.text.trim(), source: "gemini" });
        }
      }

      // Offline or fallback hint
      res.json({
        hint: `Hint: Think about which part of the plant absorbs water vs. where transpiration occurs on the leaf surface through stomata!`,
        source: "fallback",
      });
    } catch (err) {
      console.error("Error generating hint:", err);
      res.json({
        hint: `Hint: Focus on the leaves where tiny openings called stomata release water vapor into the air during photosynthesis and transpiration.`,
        source: "fallback",
      });
    }
  });

  // API Endpoint: AI Adaptive Question Generator
  app.post("/api/ai/generate-question", async (req, res) => {
    try {
      const { topic, difficulty, language } = req.body;

      if (ai) {
        const prompt = `Generate a single multiple-choice practice question for students in India in Grade 7-8.
Topic: ${topic || "Science - The Water Cycle"}
Difficulty Level: ${difficulty || "Medium"} (1 to 5)
Primary Language: ${language || "Hindi"} (Provide English translation in parentheses if non-English).

Respond with strictly JSON adhering to:
{
  "question": "Question text in ${language} (English translation)",
  "options": [
    {"id": "A", "text": "Option A"},
    {"id": "B", "text": "Option B"},
    {"id": "C", "text": "Option C"},
    {"id": "D", "text": "Option D"}
  ],
  "correctOptionId": "B",
  "explanation": "Brief explanation in ${language}"
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          return res.json({ questionData: parsed, source: "gemini" });
        }
      }

      res.json({
        questionData: {
          question: "पौधों में वाष्पोत्सर्जन किस भाग में होता है? (In which part of the plant does transpiration occur?)",
          options: [
            { id: "A", text: "जड़ (Roots)" },
            { id: "B", text: "पत्तियां (Leaves)" },
            { id: "C", text: "तना (Stem)" },
            { id: "D", text: "फूल (Flower)" }
          ],
          correctOptionId: "B",
          explanation: "वाष्पोत्सर्जन मुख्य रूप से पत्तियों में रंध्र (stomata) के माध्यम से होता है। (Transpiration occurs mainly through stomata on leaves.)"
        },
        source: "fallback"
      });
    } catch (err) {
      console.error("Error generating question:", err);
      res.status(500).json({ error: "Failed to generate question" });
    }
  });

  // API Endpoint: AI Module Content Generator (Summary and Mindmap)
  app.post("/api/ai/module-content", async (req, res) => {
    try {
      const { className, subject, chapter, module, pdfUrl } = req.body;

      // If a PDF URL is provided, fetch and extract text for the selected module
      let moduleText = "";
      if (pdfUrl) {
        const fullText = await fetchPdfText(pdfUrl);
        if (fullText) {
          moduleText = extractModuleText(fullText, module);
        }
      }

      const prompt = `You are an AI educational content generator for GyanFlow, an adaptive learning platform for Indian students.

Grade: ${className || "Class 8"}
Subject: ${subject || "Science"}
Chapter: ${chapter || "N/A"}
Module: ${module || "N/A"}

${moduleText ? `NCERT textbook content for this module:\n${moduleText}\n\n` : ""}Based on the above, generate a detailed summary and a hierarchical mindmap structure for students.

Respond with strictly JSON in this format:
{
  "summary": "Detailed summary in markdown format (300-400 words, simple language for Grade ${className || 8} students)",
  "mindmap": {
    "name": "${module || "Main Topic"}",
    "children": [
      {
        "name": "Subtopic 1",
        "children": [
          { "name": "Detail 1" },
          { "name": "Detail 2" }
        ]
      },
      {
        "name": "Subtopic 2",
        "children": [
          { "name": "Detail 3" }
        ]
      }
    ]
  }
}`;

      let result = await callOpenRouter(prompt);

      if (result && result.length >= 50) {
        try {
          const parsed = extractJsonFromString(result);
          console.log("Module content generated successfully, source: openrouter");
          return res.json({ content: parsed, source: "openrouter" });
        } catch (parseErr) {
          console.error("Failed to parse JSON from OpenRouter response:", parseErr);
          console.log("Raw response:", result?.substring(0, 500));
        }
      }

      // Fallback if OpenRouter fails or no API key
      res.json({
        content: {
          summary: `### Summary: ${module || "This Module"}\n\nThis module is part of the **${chapter || "Science"}** chapter in **${className || "Class 8"}** ${subject || "Science"}.\n\nKey learning objectives:\n1. Understand the core concepts of ${module || "this topic"}.\n2. Apply knowledge through real-world examples.\n3. Build foundational understanding for advanced topics.\n\n*The AI has summarized this module based on your selection. Connect to OpenRouter API for enhanced content generation.*\n\n${moduleText ? `Extracted context:\n${moduleText.substring(0, 500)}...` : "No PDF content was available for extraction."}`,
          mindmap: {
            name: module || "Main Topic",
            children: [
              {
                name: "Core Concepts",
                children: [{ name: "Key Principles" }, { name: "Important Terms" }]
              },
              {
                name: "Applications",
                children: [{ name: "Real-world Examples" }, { name: "Practice Problems" }]
              }
            ]
          }
        },
        source: "fallback"
      });
    } catch (err) {
      console.error("Error generating module content:", err);
      res.status(500).json({ error: "Failed to generate module content" });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GyanFlow server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
