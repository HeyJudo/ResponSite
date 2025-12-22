import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import '../../styles/resident/global.css';
import '../../styles/admin/admListOfPendingUsers.css';
import { listOfPendingUsers } from '../../API/admin/listOfPendingUsers';

const AdmListOfPendingUsers = () => {
  const navigate = useNavigate();
  const columns = [
    {
      header: 'User ID',
      key: 'userId'
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
              <div className="user-form-header">Pending User Approvals</div>
              <div className="user-table-wrapper">
                <Button onClick={() => navigate('/admListOfUsers')}>Return to Masterlist</Button>
                <Table columns={columns} data={listOfPendingUsers} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdmListOfPendingUsers;
