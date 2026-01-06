import { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import LoadingScreen from '../../components/LoadingScreen';
import '../../styles/resident/global.css';
import '../../styles/admin/admListOfUsers.css';
import { getAllUsers } from '../../API/userService';

const AdmListOfUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const columns = useMemo(() => ([
    { header: 'User ID', key: 'userId' },
    { header: 'Role', key: 'role' },
    { header: 'Username', key: 'username' },
  ]), []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getAllUsers();
        const normalized = (data || []).map((user, idx) => ({
          id: user.id ?? user.userId ?? idx,
          userId: user.userId ?? user.id ?? '—',
          role: user.role ?? user.userRole ?? '—',
          username: user.username ?? user.email ?? '—',
        }));

        setUsers(normalized);
      } catch (err) {
        setError(err.message || 'Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <AdminSidebar />
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="user-form-card">
              <div className="user-form-header">User Master List</div>
              <div className="user-table-wrapper">
                {error && (
                  <div style={{
                    marginBottom: '12px',
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
                  <LoadingScreen />
                ) : (
                  <Table columns={columns} data={users} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmListOfUsers;
