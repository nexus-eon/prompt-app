import React, { useState } from 'react';
import { Button, Input, Select } from '../../common';
import { generatePrompt } from '../../../utils/promptGenerator';
import { OpenAIService } from '../../../services/ai/openai';
import { ENV } from '../../../config/env';
import { availableModels } from '../../../config/models';
import { PromptTone } from '../../../types';
import './PromptGenerator.css';

/**
 * Available tone options for prompt generation
 */
const toneOptions = [
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'technical', label: 'Technical' },
  { value: 'simple', label: 'Simple' },
  { value: 'creative', label: 'Creative' }
];

/**
 * Model options mapped from available models configuration
 */
const modelOptions = Object.entries(availableModels).map(([id, model]) => ({
  value: id,
  label: `${model.name} - ${model.description}`
}));

// Initialize OpenAI service
let openAIService: OpenAIService | null = null;
try {
  openAIService = new OpenAIService();
} catch (error) {
  console.error('Failed to initialize OpenAI service:', error);
}

/**
 * PromptGenerator Component
 * 
 * A React component that generates AI prompts based on user input. It provides both
 * basic prompt generation and AI-powered prompt improvement capabilities.
 * 
 * Features:
 * - Model selection from available AI models
 * - Basic prompt generation based on instruction, context, and tone
 * - AI-powered prompt improvement using OpenAI API
 * - Error handling and loading states
 * - Rate limit handling with retry count
 * 
 * @example
 * ```tsx
 * <PromptGenerator />
 * ```
 */
export function PromptGenerator() {
  // Form state
  const [instruction, setInstruction] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState<PromptTone>('casual');
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value);

  // Result state
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Handles AI model selection and updates the OpenAI service
   * @param event - The event triggered by the model selection change
   */
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);
    if (openAIService) {
      try {
        openAIService.setModel(modelId);
        setError(null);
      } catch (error: any) {
        setError(`Error setting model: ${error.message}`);
      }
    }
  };

  /**
   * Generates a basic prompt using local logic
   * Validates instruction input and updates the generated prompt
   */
  const handleGenerate = () => {
    if (!instruction.trim()) {
      setError('Please enter an instruction');
      return;
    }
    const result = generatePrompt(instruction, context, tone);
    setGeneratedPrompt(result);
    setError(null);
  };

  /**
   * Improves the prompt using AI capabilities
   * Handles API errors, rate limiting, and loading states
   * @returns Promise<void>
   */
  const handleImprove = async () => {
    if (!instruction.trim()) {
      setError('Please enter an instruction');
      return;
    }

    if (!openAIService) {
      setError('OpenAI service is not properly initialized. Please check your API key.');
      return;
    }

    try {
      setIsImproving(true);
      setError(null);
      const improvedPrompt = await openAIService.improvePrompt(instruction, context);
      setGeneratedPrompt(improvedPrompt);
      setRetryCount(0);
    } catch (error: any) {
      let errorMessage = 'Error improving prompt. ';
      if (error.message.includes('rate limit')) {
        errorMessage = `Rate limit exceeded. Please try again in a moment. (Attempt ${retryCount + 1}/3)`;
        setRetryCount(prev => prev + 1);
      } else {
        errorMessage += error.message;
      }
      setError(errorMessage);
      console.error('Error:', error);
    } finally {
      setIsImproving(false);
    }
  };

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTone(event.target.value as PromptTone);
  };

  return (
    <div className="prompt-container">
      <h1 className="prompt-title">AI Prompt Generator</h1>

      <div className="prompt-form">
        <Select
          label="AI Model"
          options={modelOptions}
          value={selectedModel}
          onChange={handleModelChange}
        />

        <Input
          label="Instruction"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          multiline
          rows={4}
          placeholder="Enter your instruction here..."
          error={error && error.includes('instruction') ? error : undefined}
        />

        <Input
          label="Context (optional)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          multiline
          rows={4}
          placeholder="Enter additional context here..."
        />

        <Select
          label="Tone"
          options={toneOptions}
          value={tone}
          onChange={handleToneChange}
        />

        <div className="button-group">
          <Button
            onClick={handleGenerate}
            variant="secondary"
          >
            Generate Basic Prompt
          </Button>

          <Button
            onClick={handleImprove}
            disabled={isImproving || !ENV.GLHF_API_KEY}
            isLoading={isImproving}
          >
            {isImproving ? 'Improving...' : 'Improve with AI'}
          </Button>
        </div>

        {error && !error.includes('instruction') && (
          <div className="error-message">
            {error}
          </div>
        )}

        {generatedPrompt && (
          <div className="result-container">
            <h2 className="result-title">Generated Prompt:</h2>
            <pre className="result-content">
              {generatedPrompt}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
