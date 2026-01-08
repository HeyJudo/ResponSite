export const statusColors = {
  "In Progress": "status-inprogress",
  "Completed": "status-completed",
  "Planned": "status-planned",
  "Delayed": "status-delayed",
  "PLANNED": "status-planned",
  "IN PROGRESS": "status-inprogress",
  "COMPLETED": "status-completed",
  "DELAYED": "status-delayed",
  "AVAILABLE": "status-available",
  "LOW_STOCK": "status-lowstock",
  "DEPLETED": "status-depleted"
};

export const incidentStatusColors = {
  "PENDING": "status-pending",
  "IN_PROGRESS": "status-inprogress",
  "RESOLVED": "status-resolved",
  "CANCELLED": "status-cancelled",
  "Pending": "status-pending",
  "In Progress": "status-inprogress",
  "Resolved": "status-resolved",
  "Cancelled": "status-cancelled"
};

// Severity colors for incidents
export const severityColors = {
  "Critical": "severity-critical",
  "CRITICAL": "severity-critical",
  "High": "severity-high",
  "HIGH": "severity-high",
  "Medium": "severity-medium",
  "MEDIUM": "severity-medium",
  "Low": "severity-low",
  "LOW": "severity-low"
};

export const typeOptions = ['Bridge', 'Building', 'Drainage', 'Road', 'Other'];
export const zoneOptions = ['Zone 1', 'Zone 2', 'Zone 3'];
export const statusOptions = ['Planned', 'In Progress', 'Completed', 'Delayed'];
export const sortOptions = ['Start Date', 'Progress', 'Status'];

export const statusOrderIncreasing = ['Planned', 'Delayed', 'In Progress', 'Completed'];
export const statusOrderDecreasing = ['Completed', 'In Progress', 'Delayed', 'Planned'];
