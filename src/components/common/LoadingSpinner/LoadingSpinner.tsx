import React from 'react';
import './LoadingSpinner.css';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'currentColor',
  className = '',
  label = 'Loading...'
}) => {
  // Map size to pixel values
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  };

  // Create inline styles for the spinner
  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    borderColor: color
  };

  return (
    <div className={`spinner-container ${className}`.trim()} role="status">
      <div
        className="spinner"
        style={spinnerStyle}
        aria-hidden="true"
      />
      {/* Visually hidden label for screen readers */}
      <span className="spinner-label">
        {label}
      </span>
    </div>
  );
};
