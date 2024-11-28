import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PromptGenerator } from '../../../../../src/components/features/prompt/PromptGenerator';
import { OpenAIService } from '../../../../../src/services/OpenAIService';

// Mock OpenAIService
jest.mock('../../../../../src/services/OpenAIService');
const mockOpenAIService = OpenAIService as jest.Mocked<typeof OpenAIService>;

describe('PromptGenerator', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset ENV mock
    (global as any).ENV.GLHF_API_KEY = 'test-api-key';
  });

  it('renders all form elements correctly', () => {
    render(<PromptGenerator />);

    // Check for main elements
    expect(screen.getByText('AI Prompt Generator')).toBeInTheDocument();
    expect(screen.getByLabelText(/AI Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instruction/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Context/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tone/i)).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByText('Generate Basic Prompt')).toBeInTheDocument();
    expect(screen.getByText('Improve with AI')).toBeInTheDocument();
  });

  it('handles basic prompt generation', async () => {
    render(<PromptGenerator />);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/Instruction/i), 'Write a blog post');
    await userEvent.type(screen.getByLabelText(/Context/i), 'About AI');
    await userEvent.selectOptions(screen.getByLabelText(/Tone/i), 'formal');

    // Click generate button
    fireEvent.click(screen.getByText('Generate Basic Prompt'));

    // Check if the result is displayed
    expect(screen.getByText('Generated Prompt:')).toBeInTheDocument();
    const resultContent = screen.getByText(/Write a blog post/i);
    expect(resultContent).toBeInTheDocument();
  });

  it('shows error when trying to generate without instruction', async () => {
    render(<PromptGenerator />);

    // Click generate without filling instruction
    fireEvent.click(screen.getByText('Generate Basic Prompt'));

    // Check for error message
    expect(screen.getByText('Please enter an instruction')).toBeInTheDocument();
  });

  it('handles AI improvement successfully', async () => {
    // Mock the OpenAI service improvePrompt method
    mockOpenAIService.improvePrompt.mockResolvedValueOnce(
      'Improved prompt content'
    );

    render(<PromptGenerator />);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/Instruction/i), 'Write a blog post');

    // Click improve button
    fireEvent.click(screen.getByText('Improve with AI'));

    // Check loading state
    expect(screen.getByText('Improving...')).toBeInTheDocument();

    // Wait for the result
    await waitFor(() => {
      expect(screen.getByText('Improved prompt content')).toBeInTheDocument();
    });
  });

  it('handles AI improvement error', async () => {
    // Mock the OpenAI service to throw an error
    mockOpenAIService.improvePrompt.mockRejectedValueOnce(
      new Error('API error')
    );

    render(<PromptGenerator />);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/Instruction/i), 'Write a blog post');

    // Click improve button
    fireEvent.click(screen.getByText('Improve with AI'));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Error improving prompt/i)).toBeInTheDocument();
    });
  });

  it('handles rate limit errors with retry count', async () => {
    // Mock the OpenAI service to throw a rate limit error
    mockOpenAIService.improvePrompt.mockRejectedValueOnce(
      new Error('rate limit exceeded')
    );

    render(<PromptGenerator />);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/Instruction/i), 'Write a blog post');

    // Click improve button
    fireEvent.click(screen.getByText('Improve with AI'));

    // Wait for the rate limit error message
    await waitFor(() => {
      expect(screen.getByText(/Rate limit exceeded.*Attempt 1\/3/i)).toBeInTheDocument();
    });
  });

  it('disables AI improvement when API key is missing', () => {
    // Set API key to undefined
    (global as any).ENV.GLHF_API_KEY = undefined;

    render(<PromptGenerator />);

    // Check if the improve button is disabled
    expect(screen.getByText('Improve with AI')).toBeDisabled();
  });

  it('allows model selection', async () => {
    render(<PromptGenerator />);

    // Get the model select element
    const modelSelect = screen.getByLabelText(/AI Model/i);

    // Change the model
    await userEvent.selectOptions(modelSelect, 'qwen');

    // Check if the model was changed
    expect((modelSelect as HTMLSelectElement).value).toBe('qwen');
  });

  it('preserves form state between generations', async () => {
    render(<PromptGenerator />);

    // Fill in the form
    const instruction = 'Write a blog post';
    const context = 'About AI';

    await userEvent.type(screen.getByLabelText(/Instruction/i), instruction);
    await userEvent.type(screen.getByLabelText(/Context/i), context);
    await userEvent.selectOptions(screen.getByLabelText(/Tone/i), 'technical');

    // Generate prompt
    fireEvent.click(screen.getByText('Generate Basic Prompt'));

    // Check if form values are preserved
    expect(screen.getByLabelText(/Instruction/i)).toHaveValue(instruction);
    expect(screen.getByLabelText(/Context/i)).toHaveValue(context);
    expect(screen.getByLabelText(/Tone/i)).toHaveValue('technical');
  });
});
