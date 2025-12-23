import Sidebar from '../../features/resident/Sidebar';
import Header from '../../features/resident/Header';
import IncidentCard from '../../features/resident/IncidentCard';
import QuickButtons from '../../features/resident/QuickButtons';
import NotificationList from '../../features/resident/NotificationList';
import { dashboardNotif } from '../../API/resident/dashboardNotif'; 
import '../../styles/resident/global.css';
import '../../styles/resident/dashboard.css';


const Dashboard = () => {
  // TODO: API Call for incident count
  const incidentCount = 0;

  // TODO: API Call for notifications

  return (
    <div className="dashboard-root">
      <Header />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <IncidentCard count={incidentCount} />
            <QuickButtons />
            <NotificationList notifications={dashboardNotif} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;