const IncidentCard = ({ count, onViewClick }) => (
  <div className="incident-card">
    <div className="incident-info">
      <span className="incident-count">{count}</span>
      <span className="incident-title">My Active Incident Reports</span>
    </div>
    <button className="view-btn" onClick={onViewClick}>View</button>
  </div>
);

export default IncidentCard;
