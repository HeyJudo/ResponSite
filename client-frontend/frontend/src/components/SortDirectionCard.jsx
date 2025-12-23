import React from 'react';

const directionSets = {
  'Start Date': ['New to Old', 'Old to New'],
  'Progress': ['Start to Finish', 'Finish to Start'],
  'Status': ['Increasing', 'Decreasing'],
};

const SortDirectionCard = ({ selected, onSelect, sortType }) => {
  const directions = directionSets[sortType] || [];
  return (
    <div className="type-filter-card" style={{ marginTop: 8 }}>
      <div className="type-filter-title">Sort Direction:</div>
      <div className="sort-options">
        {directions.map(direction => (
          <div
            key={direction}
            className="sort-option"
            onClick={() => onSelect(direction)}
          >
            <div className={`sort-checkbox${selected === direction ? ' checked' : ''}`}>
              {selected === direction && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="sort-option-label">{direction}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortDirectionCard;
