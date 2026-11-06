import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({}); // will use GEMINI_API_KEY from env
async function generate() {
  const prompt = `
  Generate the exact NCERT syllabus structure for classes 8 to 12 in JSON format.
  Classes: 8, 9, 10, 11, 12.
  Core Subjects per class: 
  - 8, 9, 10: Mathematics, Science, Social Science, English.
  - 11, 12: Mathematics, Physics, Chemistry, Biology, English Core.
  
  Format:
  [
    {
      "class": "8",
      "subjects": [
        {
          "name": "Science",
          "chapters": [
            {
              "name": "Crop Production and Management",
              "modules": ["Agricultural Practices", "Basic Practices of Crop Production", "Sowing", "Adding Manure and Fertilisers", "Irrigation", "Protection from Weeds", "Harvesting", "Storage", "Food from Animals"]
            }
          ]
        }
      ]
    }
  ]
  Only output the JSON array, no markdown formatting. Provide the complete chapter list for each subject based on the latest NCERT rationalised syllabus (2023-24). Keep modules to about 3-5 key topics per chapter.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
        responseMimeType: "application/json"
    }
  });

  fs.writeFileSync('src/data/ncertSyllabus.json', response.text);
  console.log("Done");
}

generate().catch(console.error);
