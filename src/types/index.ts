import { AIModel } from '../config/models';

export interface PromptGeneratorProps {
    initialInstruction?: string;
    initialContext?: string;
    initialTone?: string;
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
