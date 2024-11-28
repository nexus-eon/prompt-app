import React from 'react';
import { ThemeProvider } from '../../contexts';
import HomePage from '../../pages';
import './App.css';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <HomePage />
      </div>
    </ThemeProvider>
  );
};
