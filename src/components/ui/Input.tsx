import React from 'react';

interface InputProps {
  type: 'text' | 'email' | 'password' | 'file';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false
}) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px'
        }}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500" style={{ color: '#d32f2f' }}>
          {error}
        </p>
      )}
    </div>
  );
};