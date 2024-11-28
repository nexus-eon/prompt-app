import React, { useState } from 'react';
import { Button, Input, Select, LoadingSpinner } from '../common';
import './ComponentExamples.css';

export const ComponentExamples: React.FC = () => {
  // State for form inputs
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [showLoading, setShowLoading] = useState(false);

  // Example options for Select
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Simulate loading when button is clicked
  const handleLoadingClick = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="examples-container">
      <h1>Component Examples</h1>

      {/* Button Examples */}
      <section className="example-section">
        <h2>Buttons</h2>
        <div className="example-grid">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button size="small">Small Button</Button>
          <Button size="large">Large Button</Button>
          <Button isLoading>Loading Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </section>

      {/* Input Examples */}
      <section className="example-section">
        <h2>Inputs</h2>
        <div className="example-grid">
          <Input
            label="Simple Input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
          />
          <Input
            label="Input with Error"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            error="This is an error message"
          />
          <Input
            label="Multiline Input"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            multiline
            rows={4}
            placeholder="Type multiple lines..."
          />
        </div>
      </section>

      {/* Select Examples */}
      <section className="example-section">
        <h2>Selects</h2>
        <div className="example-grid">
          <Select
            label="Simple Select"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
          />
          <Select
            label="Disabled Select"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            disabled
          />
          <Select
            label="Select with Error"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            error="This is an error message"
          />
        </div>
      </section>

      {/* LoadingSpinner Examples */}
      <section className="example-section">
        <h2>Loading Spinners</h2>
        <div className="example-grid">
          <div className="spinner-example">
            <LoadingSpinner size="small" />
            <span>Small Spinner</span>
          </div>
          <div className="spinner-example">
            <LoadingSpinner size="medium" />
            <span>Medium Spinner</span>
          </div>
          <div className="spinner-example">
            <LoadingSpinner size="large" />
            <span>Large Spinner</span>
          </div>
          <div className="spinner-example">
            <LoadingSpinner color="#3b82f6" />
            <span>Colored Spinner</span>
          </div>
        </div>

        <div className="loading-demo">
          <Button
            onClick={handleLoadingClick}
            disabled={showLoading}
          >
            {showLoading ? (
              <>
                <LoadingSpinner size="small" />
                Loading...
              </>
            ) : (
              'Click to Show Loading'
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};