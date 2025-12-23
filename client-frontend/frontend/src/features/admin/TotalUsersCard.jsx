import totalUsers from '../../API/admin/totalUsers';

const TotalUsersCard = () => {
  return (
    <form className="recent-incident-form-card">
      <div className="recent-incident-header">
        Total Users
      </div>
      <div className="form-card-padding">
        <div className="total-users-stack">
          {totalUsers.map(user => (
            <div className="total-users-card" key={user.type}>
              <span className="admin-form-count">{user.count}</span>
              <span className="admin-form-title">{user.type}</span>
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

export default TotalUsersCard;
