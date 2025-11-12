
import { GoogleGenAI, Type } from "@google/genai";
import { MushroomIdentification } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = (reader.result as string).split(',')[1];
      if (result) {
        resolve(result);
      } else {
        reject(new Error("Failed to convert file to base64."));
      }
    };
    reader.onerror = error => reject(error);
  });
};


const schema = {
  type: Type.OBJECT,
  properties: {
    commonName: { type: Type.STRING, description: "Common name of the mushroom." },
    scientificName: { type: Type.STRING, description: "Scientific name of the mushroom." },
    confidence: { type: Type.NUMBER, description: "Confidence score (0-100) of the identification." },
    description: { type: Type.STRING, description: "A brief, helpful description of the mushroom including key features." },
    disclaimer: { type: Type.STRING, description: "A critical safety warning about the dangers of consuming wild mushrooms based on app identification." },
  },
  required: ["commonName", "scientificName", "confidence", "description", "disclaimer"],
};


export const identifyMushroom = async (imageFile: File): Promise<MushroomIdentification> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. This app is designed to work with a backend proxy.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Image = await fileToBase64(imageFile);

  const imagePart = {
    inlineData: {
      mimeType: imageFile.type,
      data: base64Image,
    },
  };

  const textPart = {
    text: `You are an expert mycologist. Analyze the image of the mushroom provided. Your response must be in JSON format. Identify the mushroom's common and scientific names. Provide a confidence score from 0 to 100 on your identification. Include a brief, helpful description. Finally, and most importantly, provide a stern safety disclaimer warning the user never to consume a wild mushroom based on an app's identification and to always consult a human expert. The disclaimer is mandatory.`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result as MushroomIdentification;
  } catch (error) {
    console.error("Error identifying mushroom:", error);
    // This is where a backend proxy would return a specific message for rate limiting.
    // We simulate this for the frontend to handle.
    if (error instanceof Error && error.message.includes('rate limit')) {
         throw new Error("You have reached your free identification limit for today. Please try again tomorrow.");
    }
    throw new Error("Failed to identify the mushroom. The image may be unclear or the service is temporarily unavailable.");
  }
};
