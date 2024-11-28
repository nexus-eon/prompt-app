# Tests

This directory contains all test-related files for the application.

## Structure

```
tests/
├── setup/            # Test setup and configuration
│   └── setupTests.ts # Global test setup
├── utils/            # Test utilities and helpers
│   └── test-utils.tsx
├── unit/            # Unit tests
│   └── components/  # Component tests
└── integration/     # Integration tests
```

## Guidelines

1. **Test Organization**
   - Unit tests should mirror the src directory structure
   - Use descriptive test file names
   - Group related tests using describe blocks

2. **Testing Practices**
   - Write tests before fixing bugs
   - Test component behavior, not implementation details
   - Use meaningful assertions
   - Keep tests focused and isolated

3. **Test Utilities**
   - Use test-utils.tsx for common testing needs
   - Create custom renders when needed
   - Use meaningful test data

4. **Running Tests**

   ```bash
   # Run all tests
   npm test

   # Run tests in watch mode
   npm test -- --watch

   # Run tests with coverage
   npm test -- --coverage
   ```

5. **Continuous Integration**
   - All tests must pass before merging
   - Maintain test coverage above 80%
   - Review test results in CI pipeline
