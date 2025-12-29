
import { GoogleGenAI, Type } from "@google/genai";
import { BrandIdentity, BrandFormInputs } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBrandIdentity = async (inputs: BrandFormInputs): Promise<BrandIdentity> => {
  const prompt = `Act as a world-class brand strategist and creative director from a top-tier design agency (like Pentagram, Sagmeister & Walsh, or Wolff Olins).
  Create a comprehensive, professional brand identity for:
  Name: ${inputs.name || 'A new innovative project'}
  Industry/Sector: ${inputs.sector}
  Mission/Description: ${inputs.description}
  Aesthetic Style: ${inputs.style}
  Core Audience: ${inputs.audience}

  Provide a sophisticated brand strategy. Mission should be visionary. Tagline should be provocative and memorable.
  Color palette should be avant-garde but professional (4+ colors).
  Typography reasoning must be design-focused.
  Market positioning should place them relative to competitors.
  
  Format the output as a high-end brand guide JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          companyName: { type: Type.STRING },
          tagline: { type: Type.STRING },
          mission: { type: Type.STRING },
          brandVoice: { type: Type.STRING },
          targetAudience: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          colors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING },
                name: { type: Type.STRING },
                usage: { type: Type.STRING }
              },
              required: ['hex', 'name', 'usage']
            }
          },
          typography: {
            type: Type.OBJECT,
            properties: {
              headingFont: { type: Type.STRING },
              bodyFont: { type: Type.STRING },
              reasoning: { type: Type.STRING }
            },
            required: ['headingFont', 'bodyFont', 'reasoning']
          },
          marketPositioning: {
            type: Type.OBJECT,
            properties: {
              axisX: { type: Type.STRING },
              axisY: { type: Type.STRING },
              valueX: { type: Type.NUMBER },
              valueY: { type: Type.NUMBER }
            },
            required: ['axisX', 'axisY', 'valueX', 'valueY']
          }
        },
        required: ['companyName', 'tagline', 'mission', 'brandVoice', 'targetAudience', 'keywords', 'colors', 'typography', 'marketPositioning']
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateBrandLogo = async (identity: BrandIdentity): Promise<string> => {
  const firstLetter = identity.companyName.trim().charAt(0).toUpperCase();
  
  const logoPrompt = `Act as a senior graphic designer specializing in high-end minimalist corporate identity. 
  Create a singular, professional logo mark for "${identity.companyName}".
  
  CORE CONCEPT: A sophisticated geometric LETTERMARK based on the capital letter "${firstLetter}".
  
  VISUAL EXECUTION:
  - The mark must FILL THE CANVAS, leaving only a small margin for safety. 
  - DO NOT generate a frame, border, or box around the logo. Just the logo mark itself.
  - STYLE: Ultra-minimalist, flat vector design. Geometric precision. 
  - NO TEXT: Zero alphanumeric characters besides the stylized logo mark itself.
  - NO GRADIENTS: Use solid primary brand color ${identity.colors[0].hex}.
  - BACKGROUND: Pure, solid white (#FFFFFF). No textures, no shadows, no noise.
  
  The result should be a clean, bold icon that looks like it belongs to a Fortune 500 company.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: logoPrompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("Failed to generate logo image");
};
