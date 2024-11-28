import React from 'react';
import './Input.css';

/**
 * Props interface for the Input component.
 * Extends the standard HTML input attributes to support both input and textarea elements.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /** Optional label text to display above the input */
  label?: string;
  /** Optional error message to display below the input */
  error?: string;
  /** If true, renders a textarea instead of an input */
  multiline?: boolean;
  /** Number of rows to display for multiline textarea. Default is 4. */
  rows?: number;
}

/**
 * A reusable Input component that can render either a single-line input or a multiline textarea.
 * 
 * Features:
 * - Optional label
 * - Error state and message display
 * - Multiline support (textarea)
 * - Customizable through standard HTML input attributes
 * - Accessible with proper ARIA attributes
 * 
 * @example
 * ```tsx
 * // Single-line input with label
 * <Input
 *   label="Username"
 *   placeholder="Enter your username"
 *   onChange={(e) => handleChange(e)}
 * />
 * 
 * // Multiline input with error
 * <Input
 *   label="Description"
 *   multiline
 *   rows={6}
 *   error="Description is required"
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  multiline = false,
  rows = 4,
  id,
  ...props
}) => {
  // Generate an ID from the label if none provided
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  // Construct class names for styling
  const baseClass = 'input';
  const errorClass = error ? 'input-error' : '';
  const inputClassName = `${baseClass} ${errorClass} ${className}`.trim();

  // Render either textarea or input based on multiline prop
  const inputElement = multiline ? (
    <textarea
      id={inputId}
      className={inputClassName}
      rows={rows}
      aria-invalid={!!error}
      {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  ) : (
    <input
      id={inputId}
      className={inputClassName}
      aria-invalid={!!error}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      {inputElement}
      {error && (
        <span className="input-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
