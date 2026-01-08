import React from 'react';
import './EmptyState.css';

/**
 * Empty State Component
 * Displays friendly messages when there's no data to show
 */

// SVG Icons for different empty states
const Icons = {
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  inbox: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  feedback: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

// Predefined empty state configurations
const presets = {
  incidents: {
    icon: 'alert',
    title: 'No Incidents Reported',
    message: 'There are no incident reports at this time. When incidents are reported, they will appear here.',
  },
  users: {
    icon: 'users',
    title: 'No Users Found',
    message: 'There are no users matching your criteria. Try adjusting your search or filters.',
  },
  evacuationCenters: {
    icon: 'building',
    title: 'No Evacuation Centers',
    message: 'No evacuation centers have been added yet. Click "Add Center" to create one.',
  },
  resources: {
    icon: 'box',
    title: 'No Resources Available',
    message: 'No resources have been added to the inventory. Click "Add Item" to add resources.',
  },
  projects: {
    icon: 'building',
    title: 'No Infrastructure Projects',
    message: 'There are no infrastructure projects at this time. Projects will appear here once created.',
  },
  feedback: {
    icon: 'feedback',
    title: 'No Feedback Yet',
    message: 'No feedback has been submitted for this project. Feedback will appear here once residents submit their thoughts.',
  },
  notifications: {
    icon: 'inbox',
    title: 'No Notifications',
    message: 'You\'re all caught up! New notifications will appear here.',
  },
  search: {
    icon: 'search',
    title: 'No Results Found',
    message: 'We couldn\'t find anything matching your search. Try different keywords or clear your filters.',
  },
  reports: {
    icon: 'document',
    title: 'No Reports Yet',
    message: 'You haven\'t submitted any reports yet. Click "Report Incident" to submit your first report.',
  },
};

const EmptyState = ({ 
  preset,
  icon,
  title,
  message,
  action,
  actionLabel,
  className = '',
  size = 'medium' // small, medium, large
}) => {
  // Use preset if provided, otherwise use individual props
  const config = preset ? presets[preset] : { icon, title, message };
  const IconComponent = Icons[config.icon] || Icons.inbox;

  return (
    <div className={`empty-state empty-state-${size} ${className}`}>
      <div className="empty-state-icon">
        {IconComponent}
      </div>
      <h3 className="empty-state-title">{config.title || 'No Data Available'}</h3>
      <p className="empty-state-message">
        {config.message || 'There is nothing to display at this time.'}
      </p>
      {action && actionLabel && (
        <button className="empty-state-action" onClick={action}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
