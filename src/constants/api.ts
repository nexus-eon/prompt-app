export const API = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    GENERATE_PROMPT: '/api/generate',
    IMPROVE_PROMPT: '/api/improve',
  },
} as const;
