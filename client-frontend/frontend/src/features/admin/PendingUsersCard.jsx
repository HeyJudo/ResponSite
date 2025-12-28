import { listOfPendingUsers } from '../../API/admin/listOfPendingUsers';

const PendingUsersCard = () => {

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
    </form>
  );
};

export default PendingUsersCard;
