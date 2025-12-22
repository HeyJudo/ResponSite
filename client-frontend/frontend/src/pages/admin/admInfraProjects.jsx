import AdminSidebar from '../../features/admin/AdminSidebar';
import AdminHeader from '../../features/admin/AdminHeader';
import '../../styles/resident/global.css';
import '../../styles/admin/admInfraProjects.css';
import { useInfraProjectsFilters } from '../../features/admin/useInfraProjectsFilters';
import InfraProjectsFilterSort from '../../features/admin/InfraProjectsFilterSort';
import InfraProjectsTable from '../../features/admin/InfraProjectsTable';
import infraProj from '../../API/resident/infraProj';

const admInfraProjects = () => {
  const filters = useInfraProjectsFilters(infraProj);

  return (
    <div className="dashboard-root">
      <AdminHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <AdminSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">
                Infrastructure Projects
              </div>
              <InfraProjectsFilterSort filters={filters} />
              <InfraProjectsTable data={filters.filtered} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default admInfraProjects;
