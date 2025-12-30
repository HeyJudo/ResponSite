import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listOfUsers } from '../../API/admin/listOfUsers';
import { getDashboardStats } from '../../API/dashboardService';

const TotalUsersCard = () => {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({});

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await getDashboardStats();
        setDashboardStats(stats);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    fetchDashboardStats();
  }, []);

  // Calculate actual counts from the user master list
  const calculateUserCounts = () => {
    const counts = {};
    listOfUsers.forEach(user => {
      counts[user.role] = (counts[user.role] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  };

  const userCounts = calculateUserCounts();

  const handleViewAll = () => {
    navigate('/admListOfUsers');
  };

  return (
    <form className="recent-incident-form-card">
      <div className="recent-incident-header">
        Total Users {dashboardStats.totalUsers !== undefined && `(${dashboardStats.totalUsers})`}
      </div>
      <div className="form-card-padding">
        <div className="total-users-stack">
          {userCounts.map(user => (
            <div className="total-users-card" key={user.type}>
              <span className="admin-form-count">{user.count}</span>
              <span className="admin-form-title">{user.type}</span>
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

export default TotalUsersCard;
