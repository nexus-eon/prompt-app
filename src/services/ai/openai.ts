import OpenAI from 'openai';
import { ENV } from '../../config/env';
import { AIModel, availableModels, defaultModel } from '../../config/models';

interface RetryOptions {
    maxRetries: number;
    initialDelay: number;
    maxDelay: number;
}

export class OpenAIService {
    private openai: OpenAI;
    private currentModel: AIModel;
    private retryOptions: RetryOptions = {
        maxRetries: 3,
        initialDelay: 1000, // 1 second
        maxDelay: 10000 // 10 seconds
    };

    constructor(modelId: string = defaultModel) {
        if (!ENV.GLHF_API_KEY) {
            console.error('GLHF API key not found in environment variables');
            throw new Error('GLHF API key is required');
        }

        this.openai = new OpenAI({
            apiKey: ENV.GLHF_API_KEY,
            baseURL: "https://glhf.chat/api/openai/v1",
            dangerouslyAllowBrowser: true,
            defaultHeaders: {
                'Content-Type': 'application/json',
            },
            defaultQuery: {
                api_key: ENV.GLHF_API_KEY,
            },
        });

        this.currentModel = availableModels[modelId] || availableModels[defaultModel];
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async retryWithExponentialBackoff<T>(
        operation: () => Promise<T>,
        retryCount = 0
    ): Promise<T> {
        try {
            return await operation();
        } catch (error: any) {
            if (error?.message?.includes('rate limit') && retryCount < this.retryOptions.maxRetries) {
                const delayTime = Math.min(
                    this.retryOptions.initialDelay * Math.pow(2, retryCount),
                    this.retryOptions.maxDelay
                );
                console.log(`Rate limit hit. Retrying in ${delayTime}ms...`);
                await this.delay(delayTime);
                return this.retryWithExponentialBackoff(operation, retryCount + 1);
            }
            throw error;
        }
    }

    setModel(modelId: string) {
        if (!availableModels[modelId]) {
            throw new Error(`Invalid model ID: ${modelId}`);
        }
        this.currentModel = availableModels[modelId];
    }

    getCurrentModel(): AIModel {
        return this.currentModel;
    }

    async improvePrompt(instruction: string, context: string): Promise<string> {
        return this.retryWithExponentialBackoff(async () => {
            try {
                const response = await fetch('https://glhf.chat/api/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ENV.GLHF_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: this.currentModel.id,
                        messages: [
                            {
                                role: "system",
                                content: "You are an expert at writing clear, specific, and effective prompts for AI models. Your task is to improve the given prompt by making it more specific, adding relevant context, and ensuring it will produce the desired output. Return ONLY the improved prompt, without any explanations or labels."
                            },
                            {
                                role: "user",
                                content: `Improve this prompt to be more specific and effective:\n\nInstruction: ${instruction}\n${context ? `Context: ${context}` : ''}`
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: this.currentModel.maxTokens,
                        stream: false,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('API Error:', errorData);
                    if (response.status === 429) {
                        throw new Error('rate limit exceeded');
                    }
                    throw new Error(`API request failed: ${response.status}`);
                }

                const data = await response.json();
                const content = data.choices[0]?.message?.content || "Failed to generate improved prompt";

                return content.replace(/^(Improved Prompt:|\s+)/i, '').trim();
            } catch (error) {
                console.error('Error improving prompt:', error);
                throw error;
            }
        });
    }
}
