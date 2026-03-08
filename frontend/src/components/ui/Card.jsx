import React from 'react';
import './Card.css';

export const Card = ({ children, className = '', glass = false, ...props }) => {
  return (
    <div 
      className={`premium-card ${glass ? 'glass' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
