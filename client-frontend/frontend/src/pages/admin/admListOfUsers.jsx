import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import '../../styles/resident/global.css';
import '../../styles/admin/admListOfUsers.css';
import { listOfUsers } from '../../API/admin/listOfUsers';

const AdmListOfUsers = () => {
  const navigate = useNavigate();
  const columns = [
    {
      header: 'User ID',
      key: 'userId'
    },
    {
      header: 'Role',
      key: 'role'
    },
    {
      header: 'Username',
      key: 'username'
    }
  ];

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="user-form-card">
              <div className="user-form-header">User Master List</div>
              <div className="user-table-wrapper">
                <Table columns={columns} data={listOfUsers} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmListOfUsers;
