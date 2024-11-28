# PromptGenerator Component

The PromptGenerator is a React component that provides an interface for generating AI-powered prompts. It offers both basic prompt generation and AI-enhanced prompt improvement capabilities.

## Features

- **Model Selection**: Choose from multiple AI models
- **Basic Prompt Generation**: Generate prompts using local logic
- **AI-Powered Improvement**: Enhance prompts using OpenAI API
- **Error Handling**: Comprehensive error handling and user feedback
- **Rate Limiting**: Handles API rate limits with retry mechanism
- **Responsive Design**: Works on both desktop and mobile devices

## Usage

```tsx
import { PromptGenerator } from '../components/features/prompt/PromptGenerator';

function App() {
  return (
    <div>
      <PromptGenerator />
    </div>
  );
}
```

## Props

The PromptGenerator component is currently self-contained and doesn't accept any props. Future versions may include customization options.

## Component Structure

### State Management

```tsx
// Form State
const [instruction, setInstruction] = useState('');
const [context, setContext] = useState('');
const [tone, setTone] = useState('casual');
const [model, setModel] = useState(modelOptions[0].value);

// Result State
const [generatedPrompt, setGeneratedPrompt] = useState('');
const [isImproving, setIsImproving] = useState(false);
const [error, setError] = useState<string | null>(null);
const [retryCount, setRetryCount] = useState(0);
```

### Key Functions

#### handleModelChange

- Updates selected AI model
- Configures OpenAI service for the new model
- Handles any errors during model switching

#### handleGenerate

- Validates user input
- Generates basic prompt using local logic
- Updates UI with generated prompt

#### handleImprove

- Validates user input
- Makes API call to improve prompt using AI
- Handles loading states and errors
- Implements rate limit retry mechanism

## Dependencies

- React
- TypeScript
- OpenAI API (via glhf.chat)
- Common Components:
  - Button
  - Input
  - Select
  - LoadingSpinner

## Configuration

### Environment Variables

```env
REACT_APP_GLHF_API_KEY=your_api_key
```

### Available Models

Models are configured in `src/config/models.ts`:

- Mistral-7B-Instruct-v0.3
- Qwen/Qwen2.5-72B-Instruct

### Tone Options

Available tone options:

- Casual
- Formal
- Technical
- Simple
- Creative

## Styling

The component uses a dedicated CSS module for styling (`PromptGenerator.css`). Key style features:

- Responsive layout
- Modern, clean design
- Clear visual hierarchy
- Loading states and animations
- Error state styling

## Error Handling

The component handles various error scenarios:

1. Missing instruction
2. API errors
3. Rate limiting
4. Model selection errors
5. Missing API key

## Testing

Comprehensive test suite available in `tests/unit/components/features/prompt/PromptGenerator.test.tsx`:

- Unit tests for all core functionality
- Integration tests for API interactions
- Error scenario testing
- UI interaction testing

## Future Improvements

1. Customizable prompt templates
2. More tone options
3. History of generated prompts
4. Export functionality
5. Advanced prompt settings
6. Multiple API provider support

## Contributing

When contributing to this component:

1. Ensure all tests pass
2. Add tests for new features
3. Update documentation
4. Follow existing code style
5. Consider mobile responsiveness
