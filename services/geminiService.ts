
import { GoogleGenAI, Type } from "@google/genai";
import { Document, TrainingRoadmap } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizeDocument = async (doc: Document): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Please provide a concise, professional summary for the following ${doc.category} document titled "${doc.title}":\n\n${doc.content}`,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Failed to generate summary.";
};

export const generateTrainingRoadmap = async (topic: string, docs: Document[]): Promise<TrainingRoadmap> => {
  const ai = getAI();
  const context = docs.map(d => `${d.title}: ${d.summary}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Based on the following document summaries, create a structured Training Roadmap for the topic: "${topic}".\n\nContext:\n${context}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          objective: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                resources: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "description", "duration"]
            }
          }
        },
        required: ["title", "objective", "steps"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as TrainingRoadmap;
};
