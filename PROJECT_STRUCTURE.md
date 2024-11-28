# Project Structure

```text
prompt-app/
├── build/                          # Production build output
├── config/                         # Project configuration
│   ├── postcss.config.js
│   └── tailwind.config.js
├── docs/                           # Project documentation
│   ├── components/
│   │   ├── README.md
│   │   └── PromptGenerator.md
│   └── structure_fixes_needed.md
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/                           # Source code
│   ├── assets/                    # Assets (images, styles)
│   │   ├── images/
│   │   │   └── logo.svg
│   │   └── styles/
│   │       └── index.css
│   ├── components/                # React components
│   │   ├── App/
│   │   │   ├── App.css
│   │   │   ├── App.tsx
│   │   │   └── index.ts
│   │   ├── common/               # Shared components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── LoadingSpinner/
│   │   │   └── Select/
│   │   ├── examples/             # Component examples
│   │   │   ├── ComponentExamples.css
│   │   │   └── ComponentExamples.tsx
│   │   └── features/             # Feature-specific components
│   │       └── prompt/
│   │           ├── PromptGenerator.css
│   │           └── PromptGenerator.tsx
│   ├── config/                   # Application configuration
│   │   ├── env.ts
│   │   └── models.ts
│   ├── constants/                # Shared constants
│   ├── contexts/                 # React Context providers
│   ├── hooks/                    # Custom React hooks
│   │   └── useAI.ts
│   ├── layouts/                  # Layout components
│   │   ├── MainLayout.tsx
│   │   └── index.ts
│   ├── pages/                    # Page components
│   │   └── index.tsx            # Home page
│   ├── services/                 # Service integrations
│   │   └── ai/
│   │       └── openai.ts
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts
│   │   └── test.d.ts
│   └── utils/                    # Utility functions
│       ├── promptGenerator.ts
│       └── reportWebVitals.ts
├── tests/                        # Test files
│   ├── integration/             # Integration tests
│   ├── setup/                   # Test setup
│   │   └── setupTests.ts
│   ├── unit/                    # Unit tests
│   │   └── components/
│   │       ├── App/
│   │       └── features/
│   └── utils/                   # Test utilities
│       └── test-utils.tsx
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Directory Structure Overview

### Root Level

- `.env`: Environment variables
- `.gitignore`: Git ignore patterns
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration

### Configuration (`config/`)

- `postcss.config.js`: PostCSS configuration
- `tailwind.config.js`: Tailwind CSS configuration

### Source Code (`src/`)

- `assets/`: Static assets and global styles
- `components/`: React components organized by type (common, features)
- `config/`: Application configuration files
- `constants/`: Shared constants
- `contexts/`: React Context providers
- `hooks/`: Custom React hooks
- `layouts/`: Layout components
- `pages/`: Page-level components
- `services/`: External service integrations
- `types/`: TypeScript type definitions
- `utils/`: Utility functions

### Tests (`tests/`)

- `integration/`: Integration tests
- `unit/`: Unit tests organized by component
- `setup/`: Test configuration and setup
- `utils/`: Test utilities

### Documentation (`docs/`)

- `components/`: Component-specific documentation
- Architecture decisions
- Setup guides

### Build Output (`build/`)

- Production-ready build output
- Optimized static assets

This structure follows React and TypeScript best practices, with:

1. Clear separation of concerns
2. Modular organization
3. Centralized configuration
4. Comprehensive documentation
5. Proper test organization
