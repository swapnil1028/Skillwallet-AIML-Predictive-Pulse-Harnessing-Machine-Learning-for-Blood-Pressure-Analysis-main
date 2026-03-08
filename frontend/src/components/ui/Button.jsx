import React from 'react';
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false,
  ...props 
}) => {
  return (
    <button 
      className={`premium-button btn-${variant} ${loading ? 'loading' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="spinner"></span> : null}
      <span className="btn-content">{children}</span>
    </button>
  );
};
