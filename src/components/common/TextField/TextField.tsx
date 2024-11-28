import React from 'react';
import './TextField.css';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  size = 'medium',
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const baseClass = 'text-field';
  const sizeClass = `text-field-${size}`;
  const errorClass = error ? 'text-field-error' : '';
  const fullWidthClass = fullWidth ? 'text-field-full-width' : '';

  return (
    <div className={`${baseClass}-container ${fullWidthClass} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="text-field-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseClass} ${sizeClass} ${errorClass}`.trim()}
        {...props}
      />
      {error && <span className="text-field-error-message">{error}</span>}
    </div>
  );
};
