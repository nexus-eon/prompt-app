import { AIModel } from '../config/models';

export type PromptTone = 'formal' | 'casual' | 'technical' | 'simple' | 'creative';

export interface SelectOption {
  value: string;
  label: string;
}

export interface PromptGeneratorProps {
  initialInstruction?: string;
  initialContext?: string;
  initialTone?: PromptTone;
}

export interface AIServiceConfig {
  apiKey: string;
  model: AIModel;
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
}

export interface PromptResponse {
  content: string;
  model: string;
  created: number;
}

export interface PromptError {
  message: string;
  code?: string;
  retryAfter?: number;
}
