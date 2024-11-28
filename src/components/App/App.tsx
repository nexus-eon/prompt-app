import React from 'react';
import './App.css';
import { ComponentExamples } from '../examples/ComponentExamples';
import { PromptGenerator } from '../features/prompt/PromptGenerator';

function App() {
  return (
    <div className="app">
      <ComponentExamples />
      <hr className="divider" />
      <PromptGenerator />
    </div>
  );
}

export default App;
