import ResidentSidebar from '../../features/resident/ResidentSidebar';
import ResidentHeader from '../../features/resident/ResidentHeader';
import IncidentCard from '../../features/resident/IncidentCard';
import QuickButtons from '../../features/resident/QuickButtons';
import NotificationList from '../../features/resident/NotificationList';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { dashboardNotif } from '../../API/resident/dashboardNotif'; 
import { getMyIncidents } from '../../API/incidentService';
import { getDashboardStats } from '../../API/dashboardService';
import '../../styles/resident/global.css';
import '../../styles/resident/dashboard.css';
import { useState, useEffect } from 'react';


const Dashboard = () => {
  const [incidentCount, setIncidentCount] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({});

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getMyIncidents();
        setIncidents(data);
        setIncidentCount(data.length);
      } catch (err) {
        console.error('Failed to fetch incidents:', err);
      }
    };

    const fetchDashboardStats = async () => {
      try {
        const stats = await getDashboardStats();
        setDashboardStats(stats);
        // Use dashboard stats for active reports count if available
        if (stats.myActiveReports !== undefined) {
          setIncidentCount(stats.myActiveReports);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    fetchIncidents();
    fetchDashboardStats();
  }, []);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-root">
      <ResidentHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <ResidentSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <IncidentCard count={incidentCount} onViewClick={handleViewClick} />
            <QuickButtons />
            <NotificationList notifications={dashboardNotif} />
          </main>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Incident Reports"
        showFooter={false}
        className="modal-wide"
      >
        <Table
          columns={[
            { key: 'id', header: 'Incident ID' },
            { key: 'type', header: 'Type' },
            { key: 'zone', header: 'Zone' },
            { key: 'severity', header: 'Severity' },
            { key: 'status', header: 'Status' },
            { key: 'reporterName', header: 'Reported By' },
            { key: 'timestamp', header: 'Date Reported', render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A' },
            { key: 'assignedTo', header: 'Assigned to', render: (value) => value || '---' },
          ]}
          data={incidents}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;