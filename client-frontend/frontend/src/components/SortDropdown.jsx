import React from 'react';
import SortDirectionCard from './SortDirectionCard';
import '../styles/resident/resInfraProjects.css';

const SortDropdown = ({
  label = 'Sort By',
  options = [],
  selected = '',
  onSelect = () => {},
  onApply = () => {},
  onClose = () => {},
  show = false,
  sortDirection = '',
  onSortDirectionSelect = () => {},
}) => {
  if (!show) return null;
  return (
    <div className="sort-dropdown">
      <div className="type-filter-card">
        <div className="type-filter-title">{label}:</div>
        <div className="sort-options">
          {options.map(option => (
            <div
              key={option}
              className="sort-option"
              onClick={() => onSelect(option)}
            >
              <div className={`sort-checkbox${selected === option ? ' checked' : ''}`}>
                {selected === option && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="sort-option-label">{option}</span>
            </div>
          ))}
        </div>
      </div>
      {(selected === 'Start Date' || selected === 'Progress' || selected === 'Status') && (
        <SortDirectionCard sortType={selected} selected={sortDirection} onSelect={onSortDirectionSelect} />
      )}
      <div className="type-filter-actions">
        <button className="type-filter-enter" onClick={onApply} disabled={!selected}>Enter</button>
        <button className="type-filter-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SortDropdown;
