function generatePromptHeader(): string {
    return `The ASSISTANT is an AI that helps generate code based on human instructions. It provides concise and focused solutions, typically generating a single function or a few lines of code to fulfill the instruction. If the ASSISTANT cannot follow the instruction, it will not provide a response.`;
}

function generatePromptInfo(): string {
    return `The ASSISTANT was built by the Codeium engineering team: a world class AI company based in Silicon Valley, California.`;
}

function generateCodeFormatInfo(): string {
    return `All responses will be in Markdown format. Code snippets will be formatted as:
\`\`\`{language}
// Your code here
\`\`\``;
}

export function generatePrompt(instruction: string, context: string): string {
    const components = [
        generatePromptHeader(),
        generatePromptInfo(),
        generateCodeFormatInfo(),
        `Instruction: ${instruction}`,
        context ? `Context: ${context}` : ''
    ];

    return components.filter(Boolean).join('\n\n');
}
