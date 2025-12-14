import React, { useState } from 'react';
import '../styles/resident/resInfraProjects.css';

/**
 * Generic filter dropdown component.
 * @param {string} label - The label/title for the dropdown (e.g., 'Type', 'Zone', 'Status').
 * @param {string[]} options - The list of options to display.
 * @param {string} selected - The currently selected option.
 * @param {function} onSelect - Callback when an option is selected.
 * @param {function} onApply - Callback when the filter is applied (Enter button).
 * @param {function} onClose - Callback when the dropdown is closed (× button).
 * @param {boolean} show - Whether the dropdown is visible.
 * @param {React.ReactNode} cardContent - Optional custom content for the card (e.g., pink card).
 */
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
