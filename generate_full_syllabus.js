import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 
async function generate() {
  const prompt = `
  Generate the exact NCERT syllabus structure for classes 8 to 10 in JSON format.
  Classes: 8, 9, 10.
  Subjects for all classes: Mathematics, Science, Social Science (History, Geography, Civics, Economics), English.
  For Social Science, you can either group it under "Social Science" and have "History - Chapter 1" or separate them as subjects "History", "Geography", etc. Separating them as subjects is better.
  
  Format:
  [
    {
      "className": "Class 8",
      "subjects": [
        {
          "name": "Science",
          "chapters": [
            {
              "name": "Crop Production and Management",
              "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc101.pdf",
              "modules": ["Agricultural Practices", "Sowing", "Irrigation", "Harvesting"]
            }
          ]
        }
      ]
    }
  ]

  IMPORTANT constraints:
  - Generate the complete chapter list for each subject based on the NCERT syllabus (2023-24).
  - You MUST include a valid NCERT pdfUrl for EACH chapter. 
    (NCERT PDF URL pattern: https://ncert.nic.in/textbook/pdf/{code}.pdf where code is like hesc101 (h=class8, e=english, sc=science, 101=chapter1). For class 9 it's 'i' (iesc101), class 10 is 'j' (jesc101).)
  - Only output the JSON array, no markdown formatting.
  - Make sure the JSON is valid.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
    config: {
        responseMimeType: "application/json"
    }
  });

  fs.writeFileSync('src/data/ncertSyllabus.json', response.text);
  console.log("Done");
}

generate().catch(console.error);
