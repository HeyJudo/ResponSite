import { useState, useEffect } from 'react';
import { getAllIncidents } from '../../API/incidentService';
import { getItemsLowOnStockCount, getActiveInfraProjectsCount } from '../../API/shared/dashboardCounts';
import { getDashboardStats } from '../../API/dashboardService';
import { useNavigate } from 'react-router-dom';

const DashboardStatsCards = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [dashboardStats, setDashboardStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidentCount = async () => {
      try {
        const data = await getAllIncidents();
        // Count only PENDING and IN_PROGRESS incidents as "active"
        const activeCount = data.filter(incident => 
          incident.status === 'PENDING' || incident.status === 'IN_PROGRESS'
        ).length;
        setPendingCount(activeCount);
      } catch (err) {
        console.error('Failed to fetch incident count:', err);
      }
    };

    const fetchDashboardStats = async () => {
      try {
        const stats = await getDashboardStats();
        setDashboardStats(stats);
        // Use dashboard stats for pending incidents if available
        if (stats.pendingIncidents !== undefined) {
          setPendingCount(stats.pendingIncidents);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    fetchIncidentCount();
    fetchDashboardStats();
  }, []);

  return (
    <>
      <form className="admin-form-card">
        <span className="admin-form-count">{pendingCount}</span>
        <span className="admin-form-title">Incident Reports</span>
        <button type="button" className="admin-form-view-btn" onClick={() => navigate('/lguIncidentReports')}>View</button>
      </form>
      <form className="admin-form-card">
        <span className="admin-form-count">{getItemsLowOnStockCount()}</span>
        <span className="admin-form-title">Items Low on Stock</span>
        <button type="button" className="admin-form-view-btn" onClick={() => navigate('/lguResourceManagement')}>View</button>
      </form>
      <form className="admin-form-card">
        <span className="admin-form-count">{getActiveInfraProjectsCount()}</span>
        <span className="admin-form-title">Active Infrastructure Projects</span>
        <button type="button" className="admin-form-view-btn" onClick={() => navigate('/lguInfraProjects')}>View</button>
      </form>
    </>
  );
};

export default DashboardStatsCards;