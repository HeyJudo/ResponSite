import { getPendingIncidentReportsCount, getItemsLowOnStockCount, getActiveInfraProjectsCount } from '../../API/admin/adminDashboardCounts';

const DashboardStatsCards = () => {
  return (
    <>
      <form className="admin-form-card">
        <span className="admin-form-count">{getPendingIncidentReportsCount()}</span>  
        <span className="admin-form-title">Pending Incident Reports</span>
        <button type="button" className="admin-form-view-btn">View</button>
      </form>
      <form className="admin-form-card">
        <span className="admin-form-count">{getItemsLowOnStockCount()}</span>
        <span className="admin-form-title">Items Low on Stock</span>
        <button type="button" className="admin-form-view-btn">View</button>
      </form>
      <form className="admin-form-card">
        <span className="admin-form-count">{getActiveInfraProjectsCount()}</span>
        <span className="admin-form-title">Active Infrastructure Projects</span>
        <button type="button" className="admin-form-view-btn">View</button>
      </form>
    </>
  );
};

export default DashboardStatsCards;
