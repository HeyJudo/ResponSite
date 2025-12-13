const IncidentCard = ({ count }) => (
  <div className="incident-card">
    <div className="incident-info">
      <span className="incident-count">{count}</span>
      <span className="incident-title">Active Incident Reports</span>
    </div>
    <button className="view-btn">View</button>
  </div>
);

export default IncidentCard;