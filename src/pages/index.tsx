import React from 'react';
import { PromptGenerator } from '../components/features/prompt/PromptGenerator';
import { MainLayout } from '../layouts';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">AI Prompt Generator</h1>
        <PromptGenerator />
      </div>
    </MainLayout>
  );
};

export default HomePage;
