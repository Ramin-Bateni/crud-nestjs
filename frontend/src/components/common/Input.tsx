import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    leftIcon, 
    rightIcon,
    className = '',
    ...rest 
  }, ref) => {
    const hasError = !!error;
    
    const inputClasses = `
      block px-4 py-2 w-full rounded-md 
      border ${hasError ? 'border-red-500' : 'border-gray-300'} 
      focus:outline-none focus:ring-2 
      ${hasError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} 
      transition duration-200
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
    `;
    
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input 
            ref={ref} 
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={rest.id ? `${rest.id}-error` : undefined}
            {...rest} 
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p 
            className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            id={rest.id ? `${rest.id}-error` : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;