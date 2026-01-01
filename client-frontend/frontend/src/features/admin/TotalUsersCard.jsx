import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../../API/dashboardService';
import { getAllUsers } from '../../API/userService';

const TotalUsersCard = () => {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userCounts = useMemo(() => {
    const counts = {};
    users.forEach((user) => {
      const role = (user.role || user.userRole || 'Unknown').toUpperCase();
      counts[role] = (counts[role] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  }, [users]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const [stats, usersResponse] = await Promise.all([
          getDashboardStats(),
          getAllUsers(),
        ]);

        setDashboardStats(stats || {});
        const normalized = (usersResponse || []).map((user, idx) => ({
          id: user.id ?? idx,
          userId: user.userId ?? user.id ?? '—',
          role: user.role ?? user.userRole ?? '—',
          username: user.username ?? user.email ?? '—',
        }));
        setUsers(normalized);
      } catch (err) {
        console.error('Failed to fetch users or dashboard stats:', err);
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewAll = () => {
    navigate('/admListOfUsers');
  };

  return (
    <form className="recent-incident-form-card">
      <div className="recent-incident-header">
        Total Users {dashboardStats.totalUsers !== undefined && `(${dashboardStats.totalUsers})`}
      </div>
      <div className="form-card-padding">
        {error && (
          <div style={{
            marginBottom: '10px',
            padding: '10px 12px',
            borderRadius: '10px',
            backgroundColor: '#ffeaea',
            color: '#b3261e',
            fontWeight: 600,
          }}>
            {error}
          </div>
        )}
        {loading ? (
          <div style={{ padding: '12px 0', fontWeight: 600, color: '#4a4a4a' }}>Loading...</div>
        ) : (
          <div className="total-users-stack">
            {userCounts.map(user => (
              <div className="total-users-card" key={user.type}>
                <span className="admin-form-count">{user.count}</span>
                <span className="admin-form-title">{user.type}</span>
              </div>
            ))}
            {userCounts.length === 0 && (
              <div style={{ color: '#4a4a4a', fontWeight: 600 }}>No users found</div>
            )}
          </div>
        )}
      </div>
      <div className="view-btn-container">
        <button type="button" className="admin-form-view-btn" onClick={handleViewAll}>View All</button>
      </div>
    </form>
  );
};

export default TotalUsersCard;
