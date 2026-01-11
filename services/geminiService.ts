
import { GoogleGenAI, Type } from "@google/genai";
import { Message, Scenario, Scorecard } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateResponse(scenario: Scenario, history: Message[]) {
    // Note: In a real app, we'd use a chat session. Here we send the history for simplicity.
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: scenario.systemInstruction,
        temperature: 0.9,
        topP: 0.95,
      }
    });

    return response.text || "I have nothing to say to you. *Hangs up*";
  }

  async getCoachingReport(scenario: Scenario, history: Message[]): Promise<Scorecard> {
    const chatLog = history.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
    
    const prompt = `Analyze the following sales roleplay conversation. 
    The user was trying to sell to a persona named ${scenario.personaName} with the goal: ${scenario.description}.
    
    Conversation Log:
    ${chatLog}
    
    Provide a detailed scorecard based on their performance.`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are a world-class Sales Coach. You provide constructive, data-driven feedback on empathy, clarity, and objection handling.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER, description: "Score from 0-100" },
            empathyScore: { type: Type.INTEGER, description: "Score from 0-100" },
            clarityScore: { type: Type.INTEGER, description: "Score from 0-100" },
            objectionHandlingScore: { type: Type.INTEGER, description: "Score from 0-100" },
            whatYouDidWell: { type: Type.STRING, description: "A specific quote or technique they executed well" },
            whereYouFailed: { type: Type.STRING, description: "A specific quote or missed opportunity" },
            suggestedImprovement: { type: Type.STRING, description: "How they should have handled a specific difficult moment" }
          },
          required: ["overallScore", "empathyScore", "clarityScore", "objectionHandlingScore", "whatYouDidWell", "whereYouFailed", "suggestedImprovement"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as Scorecard;
  }
}
