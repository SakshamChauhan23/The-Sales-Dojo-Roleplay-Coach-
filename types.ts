
export type PersonaId = 'landlord' | 'cto' | 'gatekeeper';

export interface Scenario {
  id: PersonaId;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  personaName: string;
  systemInstruction: string;
  avatar: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Scorecard {
  overallScore: number;
  empathyScore: number;
  clarityScore: number;
  objectionHandlingScore: number;
  whatYouDidWell: string;
  whereYouFailed: string;
  suggestedImprovement: string;
}

export interface User {
  email: string;
  isWhitelisted: boolean;
  expiryDate: string | null;
  role: 'admin' | 'rep';
}
