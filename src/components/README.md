# Components

This directory contains all React components used in the application.

## Structure

- `App/` - Main application component
- `common/` - Reusable components shared across features
- `features/` - Feature-specific components
  - `prompt/` - Components related to prompt generation functionality

## Guidelines

1. **Component Organization**
   - Each component should have its own directory
   - Include related files (styles, tests, types) in the component directory
   - Use index.ts files for clean exports

2. **Naming Conventions**
   - Use PascalCase for component files and directories
   - Use .tsx extension for component files
   - Use .module.css for component-specific styles

3. **Component Structure**
   - Keep components focused and single-responsibility
   - Extract reusable logic into custom hooks
   - Use TypeScript interfaces for props

4. **Testing**
   - Each component should have corresponding tests
   - Use data-testid for test selectors
   - Test component behavior, not implementation
