import React from 'react';
import './Select.css';

// Define the option type that our select will use
export interface SelectOption {
  value: string;
  label: string;
}

// Props interface extending HTML select element props
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  id,
  ...props
}) => {
  // Generate an ID from the label if none provided
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="select-container">
      {/* Show label if provided */}
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
        </label>
      )}

      {/* The select element */}
      <select
        id={selectId}
        className={`select ${error ? 'select-error' : ''} ${className}`.trim()}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...props}
      >
        {/* Map through options to create option elements */}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Show error message if provided */}
      {error && <span className="select-error-message">{error}</span>}
    </div>
  );
};
