import React, { useState } from 'react';
import '../styles/resident/resInfraProjects.css';

const FilterDropdown = ({
  label = 'Filter',
  options = [],
  selected = '',
  onSelect = () => {},
  onApply = () => {},
  onClose = () => {},
  show = false,
  cardContent = null,
}) => {
  if (!show) return null;
  return (
    <div className="type-filter-dropdown">
      <div className="type-filter-card">
        <div className="type-filter-title">{label}:</div>
        {cardContent}
        <div className="type-filter-options">
          {options.map(option => (
            <button
              key={option}
              className={`type-filter-option${selected === option ? ' selected' : ''}`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="type-filter-actions">
        <button className="type-filter-enter" onClick={onApply} disabled={!selected}>Enter</button>
        <button className="type-filter-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default FilterDropdown;
