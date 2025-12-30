import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to wait
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- TUTOR SERVICE ---
export const getTutorResponse = async (userMessage: string, context: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, I cannot answer right now because the API key is missing. Please check your configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Context: The user is currently on the "${context}" step of a web development tutorial for absolute beginners.
      
      User Question: ${userMessage}`,
      config: {
        systemInstruction: `You are "DevBuddy", a friendly, enthusiastic, and patient web development tutor. 
        Your student has ZERO experience and may be confused about basic computer tasks.
        
        CRITICAL RULES:
        1. If the user asks about installing Netlify or GitHub, EXPLICITLY state they are websites, not programs to download.
        2. Keep answers short (under 3 sentences if possible).
        3. Use simple analogies (HTML = Skeleton, CSS = Clothing, JS = Muscles/Brain).
        4. Be super encouraging!`,
      }
    });

    return response.text || "I'm having a little trouble thinking right now. Try asking again!";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.toString().includes('429') || error.toString().toLowerCase().includes('quota')) {
      return "🛑 **Traffic Limit Reached.** The AI service is busy. Please wait a moment for the quota to reset.";
    }
    return "Oops! My brain froze. Please try again in a moment.";
  }
};

// --- BUILDER SERVICE ---

export interface ArchitectResponse {
  message: string;
  html: string;
  css: string;
  javascript: string;
  suggestions: string[];
  quotaExceeded?: boolean;
  retryAfterSeconds?: number;
}

export const chatWithArchitect = async (
  history: ChatMessage[],
  currentHtml: string,
  currentCss: string,
  newImages: string[] = [],
  theme: string = 'Auto',
  arrangement: string = 'Auto'
): Promise<ArchitectResponse | null> => {
  if (!apiKey) return null;

  try {
    // Optimization: Focus context to reduce token count
    const recentHistory = history.slice(-3).map(msg => 
      `${msg.role === 'user' ? 'User' : 'Architect'}: ${msg.text}`
    ).join('\n');

    const promptText = `Role: You are an expert AI Full-Stack Architect. You build **MARKET-READY SINGLE PAGE APPLICATIONS (SPA)**.
        
Context:
- Current HTML Code: 
${currentHtml || '(Empty)'}
- Current CSS Code: 
${currentCss || '(Empty)'}
- User Selected Visual Theme: ${theme}
- Requested Image Arrangement: ${arrangement}

Conversation History:
${recentHistory}

Task:
1. Build a **Single Page Application** with multiple <section> blocks.
2. Navigation must use showPage(id) JavaScript function, NOT href="page.html".
3. HTML: Semantic. CSS: Responsive. JS: Functional logic.
4. Auto-source images via loremflickr.com if no user images provided.
5. Provide index.html, style.css, script.js.
6. Provide 3 suggestions.`;

    const contentParts: any[] = [{ text: promptText }];

    if (newImages && newImages.length > 0) {
      newImages.forEach(img => {
        const base64Data = img.split(',')[1] || img;
        contentParts.push({ inlineData: { mimeType: 'image/png', data: base64Data } });
      });
    }

    let response;
    let attempts = 0;
    const maxRetries = 2; // Reduced retries to fail faster and show the user timer

    while (attempts < maxRetries) {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { parts: contentParts },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                message: { type: Type.STRING },
                html: { type: Type.STRING },
                css: { type: Type.STRING },
                javascript: { type: Type.STRING },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["message", "html", "css", "javascript", "suggestions"]
            }
          }
        });
        break; 
      } catch (error: any) {
        attempts++;
        const isQuota = error.toString().includes('429') || error.toString().toLowerCase().includes('quota');
        if (isQuota && attempts < maxRetries) {
          await delay(1500 * attempts);
          continue;
        } else {
          throw error;
        }
      }
    }

    if (response && response.text) {
      const data = JSON.parse(response.text) as ArchitectResponse;
      if (!data.html.includes('script.js') && data.html.includes('</body>')) {
        data.html = data.html.replace('</body>', '    <script src="script.js" defer></script>\n</body>');
      }
      return data;
    }
    return null;

  } catch (error: any) {
    console.error("Gemini Architect Error:", error);
    
    if (error.toString().includes('429') || error.toString().toLowerCase().includes('quota')) {
       return {
         message: "⚠️ **Quota Limit Reached.**",
         html: currentHtml, 
         css: currentCss,
         javascript: '', 
         suggestions: [],
         quotaExceeded: true,
         retryAfterSeconds: 60 // Standard wait time for RPM reset
       };
    }
    return null;
  }
};

export const generateWebsite = async (prompt: string): Promise<ArchitectResponse | null> => {
  return chatWithArchitect([{ id: '1', role: 'user', text: prompt, timestamp: new Date() }], '', '', []);
};