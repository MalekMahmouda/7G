import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  className = ''
}) => {
  const baseStyles = {
    padding: '12px 24px',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    outline: 'none',
    opacity: disabled || loading ? 0.7 : 1
  };

  const variants = {
    primary: {
      backgroundColor: '#000090',
      color: '#ffffff',
      border: '2px solid #000090'
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#000090',
      border: '2px solid #000090'
    },
    danger: {
      backgroundColor: '#d32f2f',
      color: '#ffffff',
      border: '2px solid #d32f2f'
    }
  };

  const hoverStyles = {
    primary: {
      backgroundColor: disabled || loading ? '#000090' : '#1800c0',
      borderColor: disabled || loading ? '#000090' : '#1800c0'
    },
    secondary: {
      backgroundColor: disabled || loading ? '#ffffff' : '#f5f5f5',
      borderColor: disabled || loading ? '#000090' : '#1800c0'
    },
    danger: {
      backgroundColor: disabled || loading ? '#d32f2f' : '#b71c1c',
      borderColor: disabled || loading ? '#d32f2f' : '#b71c1c'
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{
        ...baseStyles,
        ...variants[variant],
        ...(disabled || loading ? {} : hoverStyles[variant])
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.target.style, hoverStyles[variant]);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.target.style, variants[variant]);
        }
      }}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};