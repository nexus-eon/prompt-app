# AI Prompt Generator

A modern React application for generating and improving AI prompts using various AI models.

## Project Overview

The AI Prompt Generator is a TypeScript-based React application that helps users create and refine prompts for AI models. It supports multiple AI models and provides various tone options for prompt customization.

## Project Structure

```text
prompt-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components and routes
│   ├── config/        # Configuration files
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and service integrations
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── tests/            # Test files
├── public/           # Static assets
└── docs/            # Documentation
```

## Features

- Multiple AI model support:
  - Mistral-7B-Instruct-v0.3
  - Qwen/Qwen2.5-72B-Instruct

- Tone customization options:
  - Casual
  - Formal
  - Technical
  - Simple
  - Creative

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**

   ```bash
   cd prompt-app
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```text
   REACT_APP_GLHF_API_KEY=your_api_key_here
   ```

4. **Development**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

5. **Testing**

   ```bash
   npm test
   ```

## Security

This project includes automated security scanning and dependency management:

### Automated Checks

- Daily security audits via GitHub Actions
- Snyk vulnerability scanning on PRs and main branch
- Dependency updates monitoring

### Local Security Commands

```bash
# Run security audit and check outdated dependencies
npm run security-check

# Automatically fix security issues
npm run security-fix

# Check for available dependency updates
npm run deps-check

# Update all dependencies to their latest versions
npm run deps-update
```

### Security Best Practices

1. Regular dependency updates
2. Automated vulnerability scanning
3. Package version pinning via overrides
4. Continuous monitoring via GitHub Actions

## Available Scripts

- `npm start` - Runs the development server
- `npm test` - Runs the test suite
- `npm run build` - Creates a production build
- `npm run eject` - Ejects from Create React App

## Testing

The project uses Jest and React Testing Library for testing. Tests are located in the `tests` directory and follow the naming convention `*.test.tsx`.

## Contributing

1. Follow the existing code structure
2. Write tests for new features
3. Ensure TypeScript types are properly defined
4. Update documentation as needed

## Tech Stack

- React 18
- TypeScript
- Jest & React Testing Library
- OpenAI SDK
- Tailwind CSS

## License

MIT
