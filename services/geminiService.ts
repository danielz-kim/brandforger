
import { GoogleGenAI, Type } from "@google/genai";
import { BrandIdentity, BrandFormInputs } from "../types";

/**
 * Generates 3 distinct brand identities in one pass.
 * Uses gemini-3-pro-preview for strategic depth.
 */
export const generateBrandIdentities = async (inputs: BrandFormInputs): Promise<BrandIdentity[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Act as an elite brand incubator for high-speed startups. 
  The mission is: "Get quick branding so builders can focus on the work that matters."
  
  Create THREE (3) distinct and comprehensive branding concepts for:
  Name: ${inputs.name || 'An innovative venture'}
  Sector: ${inputs.sector}
  Description: ${inputs.description}
  Style Preference: ${inputs.style}
  Audience: ${inputs.audience}

  Each of the 3 concepts should have a unique personality:
  1. The "Efficient Minimalist" (Clean, high-performance, utilitarian)
  2. The "Bold Disruptor" (Vibrant, loud, unconventional)
  3. The "Trusted Standard" (Established, professional, secure)

  Format the output as a JSON array of 3 brand identity objects.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
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
    }
  });

  return JSON.parse(response.text || '[]');
};

/**
 * Generates a usable, minimalist professional logo.
 */
export const generateBrandLogo = async (identity: BrandIdentity): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const firstLetter = identity.companyName.trim().charAt(0).toUpperCase();
  
  // Refined prompt for "actual usable logos"
  const logoPrompt = `Act as a senior graphic designer specializing in minimalist logo marks for tech and modern ventures.
  
  OBJECTIVE: Create a singular, professional, geometric logo mark for "${identity.companyName}".
  
  VISUAL STYLE:
  - MINIMALIST VECTOR: Think of the simplicity of Airbnb, Uber, or Discord.
  - GEOMETRY: Use bold, clean geometric shapes to create a unique symbol.
  - LETTERMARK OR ICON: Focus on the letter "${firstLetter}" OR a clever abstraction of "${identity.keywords[0]}".
  - COLORS: Use ONLY the brand's primary color: ${identity.colors[0].hex}.
  - FLAT DESIGN: No gradients, no shadows, no 3D effects, no textures.
  - PURE BACKGROUND: The logo must be on a SOLID PURE WHITE (#FFFFFF) background.
  - NO TEXT: Absolutely no letters or words within the image, just the logo icon itself.
  
  The result should be a high-contrast mark that is recognizable at any size.`;

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

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  
  throw new Error("Logo generation failed");
};
