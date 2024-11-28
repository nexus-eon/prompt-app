interface PromptTemplate {
    instruction: string;
    template: string;
    tones?: { [key: string]: string };
}

const toneModifiers = {
    formal: 'Use formal language and maintain a professional tone throughout.',
    casual: 'Use casual, conversational language while keeping it appropriate.',
    technical: 'Use precise technical terminology and maintain academic rigor.',
    simple: 'Use simple language suitable for a general audience.',
    creative: 'Use creative and engaging language with vivid descriptions.',
};

const promptTemplates: { [key: string]: PromptTemplate } = {
    default: {
        instruction: '',
        template: '{instruction}{context}',
        tones: {
            formal: 'Provide a formal response to the following: {template}',
            casual: 'In a casual way, address the following: {template}',
            technical: 'Provide a technical analysis of: {template}',
            simple: 'Explain in simple terms: {template}',
            creative: 'Creatively address: {template}'
        }
    },
    joke: {
        instruction: 'tell me a joke',
        template: 'Generate a clean, light-hearted, and amusing joke suitable for general audiences. The joke should be original and incorporate clever wordplay or situational humor.',
        tones: {
            formal: 'Create a sophisticated humorous anecdote suitable for professional settings.',
            casual: 'Tell a fun, relatable joke that friends might share.',
            technical: 'Construct a joke involving technical or scientific concepts.',
            simple: 'Share a simple, easy-to-understand joke.',
            creative: 'Create a unique, imaginative joke with unexpected elements.'
        }
    },
    story: {
        instruction: 'tell me a story',
        template: 'Create an engaging short story that captures the imagination and delivers a satisfying conclusion.',
        tones: {
            formal: 'Compose a refined narrative suitable for literary publication.',
            casual: 'Share an entertaining story as if telling it to friends.',
            technical: 'Construct a narrative incorporating technical or scientific elements.',
            simple: 'Tell an easy-to-follow story for general audiences.',
            creative: 'Craft an imaginative tale with unique elements.'
        }
    },
    explain: {
        instruction: 'explain',
        template: 'Provide a clear, comprehensive explanation suitable for a general audience, using analogies where helpful.',
        tones: {
            formal: 'Present a structured, academic explanation.',
            casual: 'Explain in a friendly, conversational way.',
            technical: 'Provide a detailed technical explanation with proper terminology.',
            simple: 'Explain in the simplest possible terms.',
            creative: 'Explain using creative analogies and examples.'
        }
    },
    summarize: {
        instruction: 'summarize',
        template: 'Create a concise summary that captures the key points while maintaining clarity and context.',
        tones: {
            formal: 'Provide a formal executive summary.',
            casual: 'Give a quick, friendly overview.',
            technical: 'Create a technical abstract with key specifications.',
            simple: 'Summarize in plain, accessible language.',
            creative: 'Create an engaging summary with creative elements.'
        }
    },
    analyze: {
        instruction: 'analyze',
        template: 'Provide a thorough analysis considering multiple aspects and perspectives.',
        tones: {
            formal: 'Conduct a formal analytical assessment.',
            casual: 'Break down the analysis in an approachable way.',
            technical: 'Perform a detailed technical analysis.',
            simple: 'Analyze in clear, straightforward terms.',
            creative: 'Provide an innovative analytical perspective.'
        }
    },
    compare: {
        instruction: 'compare',
        template: 'Create a detailed comparison highlighting key similarities and differences.',
        tones: {
            formal: 'Present a structured comparative analysis.',
            casual: 'Compare in a friendly, relatable way.',
            technical: 'Provide a technical comparison with specific metrics.',
            simple: 'Compare using simple, clear terms.',
            creative: 'Create an imaginative comparison.'
        }
    }
};

export function generatePrompt(instruction: string, context?: string, tone: keyof typeof toneModifiers = 'casual'): string {
    const lowercaseInstruction = instruction.toLowerCase();

    // Find matching template
    let template = promptTemplates.default;
    for (const [, value] of Object.entries(promptTemplates)) {
        if (lowercaseInstruction.includes(value.instruction)) {
            template = value;
            break;
        }
    }

    // Generate base prompt using tone if available
    let prompt = template.tones?.[tone]
        ? template.tones[tone].replace('{template}', template.template)
        : template.template;

    // Add specific instruction if using default template
    if (template === promptTemplates.default) {
        prompt = prompt
            .replace('{instruction}', instruction)
            .replace('{context}', context ? `\nContext: ${context}` : '');
    }

    // Add any context as additional requirements if not using default template
    if (context && template !== promptTemplates.default) {
        prompt += `\nAdditional requirements: ${context}`;
    }

    // Add tone modifier
    prompt += `\n\nTone: ${toneModifiers[tone]}`;

    // Add quality guidelines for better results
    prompt += '\n\nEnsure the response is:';
    prompt += '\n- Clear and well-structured';
    prompt += '\n- Appropriate for the target audience';
    prompt += '\n- Engaging and natural in tone';
    prompt += '\n- Focused and concise';
    prompt += '\n- Original and thoughtful';

    return prompt;
}
