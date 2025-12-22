import pendingUsers from '../../API/admin/pendingUsers';

const PendingUsersCard = () => {
  return (
    <form className="recent-incident-form-card">
      <div className="recent-incident-header">
        Pending Users to Approve
      </div>
      <div className="form-card-padding">
        <div className="total-users-stack">
          {pendingUsers.map((user, idx) => (
            <div className="total-users-card" key={idx}>
              <span className="admin-form-title">{user.username}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="view-btn-container">
        <button type="button" className="admin-form-view-btn">View All</button>
      </div>
    </form>
  );
};

export default PendingUsersCard;
