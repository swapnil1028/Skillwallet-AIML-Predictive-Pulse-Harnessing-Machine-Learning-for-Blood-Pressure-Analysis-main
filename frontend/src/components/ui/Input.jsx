import React from 'react';
import './Input.css';

export const Input = ({ 
  label, 
  icon: Icon,
  error,
  className = '', 
  ...props 
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={18} />}
        <input 
          className={`premium-input ${Icon ? 'with-icon' : ''} ${error ? 'error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};
