export const ENV = {
    GLHF_API_KEY: process.env.REACT_APP_GLHF_API_KEY || '',
};

// Log environment variables during development
if (process.env.NODE_ENV === 'development') {
    console.log('Environment variables loaded:', {
        GLHF_API_KEY_SET: !!ENV.GLHF_API_KEY,
    });
}
