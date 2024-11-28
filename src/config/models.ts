export interface AIModel {
    id: string;
    name: string;
    description: string;
    maxTokens: number;
    provider: 'glhf';
}

export const availableModels: { [key: string]: AIModel } = {
    qwen72b: {
        id: 'hf:Qwen/Qwen2.5-72B-Instruct',
        name: 'Qwen 2.5 72B',
        description: 'High-performance large language model with 72B parameters',
        maxTokens: 4096,
        provider: 'glhf'
    },
    mistral7b: {
        id: 'hf:mistralai/Mistral-7B-Instruct-v0.3',
        name: 'Mistral 7B',
        description: 'Efficient and powerful 7B parameter model',
        maxTokens: 2048,
        provider: 'glhf'
    }
};

export const defaultModel = 'qwen72b';
