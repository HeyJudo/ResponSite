import Sidebar from '../features/dashboard/Sidebar';
import Header from '../features/dashboard/Header';
import IncidentCard from '../features/dashboard/IncidentCard';
import QuickButtons from '../features/dashboard/QuickButtons';
import NotificationList from '../features/dashboard/NotificationList';
import { dummyNotifications } from '../API/dummyNotifications';
import '../styles/resident/global.css';
import '../styles/resident/dashboard.css';


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
            <NotificationList notifications={dummyNotifications} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;