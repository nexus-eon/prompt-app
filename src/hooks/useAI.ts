import { useState, useCallback } from 'react';
import { OpenAIService } from '../services/ai/openai';
import { AIModel } from '../config/models';
import { PromptError } from '../types';

interface UseAIReturn {
    isLoading: boolean;
    error: PromptError | null;
    improvePrompt: (instruction: string, context: string) => Promise<string>;
    setModel: (model: AIModel) => void;
    retryCount: number;
}

export const useAI = (initialService: OpenAIService): UseAIReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<PromptError | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [service] = useState(initialService);

    const improvePrompt = useCallback(async (instruction: string, context: string): Promise<string> => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await service.improvePrompt(instruction, context);
            setRetryCount(0);
            return result;
        } catch (err: any) {
            const error: PromptError = {
                message: 'Error improving prompt',
                code: err.code
            };

            if (err.message.includes('rate limit')) {
                error.message = `Rate limit exceeded. Please try again in a moment. (Attempt ${retryCount + 1}/3)`;
                error.code = 'RATE_LIMIT';
                setRetryCount(prev => prev + 1);
            }

            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [service, retryCount]);

    const setModel = useCallback((model: AIModel) => {
        try {
            service.setModel(model.id);
            setError(null);
        } catch (err: any) {
            setError({
                message: `Error setting model: ${err.message}`,
                code: 'MODEL_ERROR'
            });
        }
    }, [service]);

    return {
        isLoading,
        error,
        improvePrompt,
        setModel,
        retryCount
    };
};
