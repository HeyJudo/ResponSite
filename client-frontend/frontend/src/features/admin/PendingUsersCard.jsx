import { useNavigate } from 'react-router-dom';
import { listOfPendingUsers } from '../../API/admin/listOfPendingUsers';

const PendingUsersCard = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/admListOfPendingUsers');
  };

  return (
    <form className="recent-incident-form-card">
      <div className="recent-incident-header">
        Pending Users to Approve
      </div>
      <div className="form-card-padding">
        <div className="total-users-stack">
          {listOfPendingUsers.map((user) => (
            <div className="total-users-card" key={user.id}>
              <span className="admin-form-title">{user.username}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="view-btn-container">
        <button type="button" className="admin-form-view-btn" onClick={handleViewAll}>View All</button>
      </div>
    </form>
  );
};

export default PendingUsersCard;
