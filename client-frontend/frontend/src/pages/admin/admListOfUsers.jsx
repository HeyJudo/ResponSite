import { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import { SkeletonTable } from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import '../../styles/resident/global.css';
import '../../styles/admin/admListOfUsers.css';
import { getAllUsers } from '../../API/userService';

const AdmListOfUsers = () => {
  const toast = useToast();
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
        const errorMessage = err.message || 'Failed to load users.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <SkeletonTable columns={3} rows={8} />;
    }

    if (error) {
      return (
        <EmptyState
          icon="⚠️"
          title="Failed to Load Users"
          message={error}
          action={() => window.location.reload()}
          actionLabel="Try Again"
        />
      );
    }

    if (users.length === 0) {
      return <EmptyState preset="users" />;
    }

    return <Table columns={columns} data={users} />;
  };

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
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmListOfUsers;
