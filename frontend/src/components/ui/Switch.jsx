import React from 'react';
import './Switch.css';

export const Switch = ({ label, checked, onChange, name }) => {
  return (
    <label className="switch-container">
      <span className="switch-label">{label}</span>
      <div className={`switch-track ${checked ? 'checked' : ''}`}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="switch-input"
        />
        <div className="switch-thumb" />
      </div>
    </label>
  );
};
