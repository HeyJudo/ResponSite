import React from 'react';
import './SkeletonLoader.css';

/**
 * Skeleton Loader Component
 * Displays animated placeholder content while data is loading
 */

// Basic skeleton shapes
export const SkeletonBox = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => (
  <div 
    className={`skeleton-box ${className}`}
    style={{ width, height, borderRadius }}
  />
);

export const SkeletonCircle = ({ size = '40px', className = '' }) => (
  <div 
    className={`skeleton-box ${className}`}
    style={{ width: size, height: size, borderRadius: '50%' }}
  />
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`skeleton-text ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonBox 
        key={i} 
        width={i === lines - 1 ? '60%' : '100%'} 
        height="14px" 
      />
    ))}
  </div>
);

// Table row skeleton
export const SkeletonTableRow = ({ columns = 5 }) => (
  <tr className="skeleton-table-row">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i}>
        <SkeletonBox height="16px" width={i === 0 ? '60px' : '80%'} />
      </td>
    ))}
  </tr>
);

// Full table skeleton
export const SkeletonTable = ({ rows = 5, columns = 5 }) => (
  <div className="skeleton-table-container">
    <table className="skeleton-table">
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i}>
              <SkeletonBox height="14px" width="70%" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonTableRow key={i} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

// Card skeleton
export const SkeletonCard = ({ hasImage = false, className = '' }) => (
  <div className={`skeleton-card ${className}`}>
    {hasImage && <SkeletonBox height="150px" borderRadius="8px 8px 0 0" />}
    <div className="skeleton-card-content">
      <SkeletonBox width="70%" height="20px" />
      <SkeletonText lines={2} />
      <SkeletonBox width="40%" height="32px" borderRadius="6px" />
    </div>
  </div>
);

// Stats card skeleton
export const SkeletonStatsCard = () => (
  <div className="skeleton-stats-card">
    <div className="skeleton-stats-icon">
      <SkeletonCircle size="48px" />
    </div>
    <div className="skeleton-stats-content">
      <SkeletonBox width="60%" height="14px" />
      <SkeletonBox width="40%" height="28px" />
    </div>
  </div>
);

// Dashboard skeleton
export const SkeletonDashboard = () => (
  <div className="skeleton-dashboard">
    <div className="skeleton-stats-row">
      <SkeletonStatsCard />
      <SkeletonStatsCard />
      <SkeletonStatsCard />
      <SkeletonStatsCard />
    </div>
    <div className="skeleton-content-row">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

// Form skeleton
export const SkeletonForm = ({ fields = 4 }) => (
  <div className="skeleton-form">
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="skeleton-form-field">
        <SkeletonBox width="30%" height="14px" />
        <SkeletonBox height="40px" borderRadius="6px" />
      </div>
    ))}
    <SkeletonBox width="120px" height="40px" borderRadius="6px" />
  </div>
);

// Default export for general use
const SkeletonLoader = ({ type = 'table', ...props }) => {
  switch (type) {
    case 'table':
      return <SkeletonTable {...props} />;
    case 'card':
      return <SkeletonCard {...props} />;
    case 'stats':
      return <SkeletonStatsCard {...props} />;
    case 'dashboard':
      return <SkeletonDashboard {...props} />;
    case 'form':
      return <SkeletonForm {...props} />;
    case 'text':
      return <SkeletonText {...props} />;
    default:
      return <SkeletonBox {...props} />;
  }
};

export default SkeletonLoader;
