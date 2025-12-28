import { useState, useEffect } from 'react';
import ResidentSidebar from '../../features/resident/ResidentSidebar';
import ResidentHeader from '../../features/resident/ResidentHeader';
import Table from '../../components/Table';
import { getAllEvacuationCenters } from '../../API/evacuationCenterService';
import '../../styles/resident/global.css';
import '../../styles/resident/resInfraProjects.css';


const ResidentEvacuationCenter = () => {
  const [evacuationCenters, setEvacuationCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvacuationCenters = async () => {
      try {
        setLoading(true);
        const data = await getAllEvacuationCenters();
        setEvacuationCenters(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setEvacuationCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvacuationCenters();
  }, []);

  return (
    <div className="dashboard-root">
      <ResidentHeader />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <ResidentSidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="resource-form-card">
              <div className="resource-form-header">Evacuation Centers</div>
              {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading...</p>}
              {error && <p style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</p>}
              {!loading && !error && (
                <div className="resource-table-container">
                  <Table
                    columns={[
                      { key: 'name', header: 'Name' },
                      { key: 'location', header: 'Location' },
                      { key: 'status', header: 'Status', render: (value) => (
                        <span className={`evac-status ${value.toLowerCase()}`}>{value}</span>
                      ) },
                      { key: 'capacity', header: 'Capacity' },
                    ]}
                    data={evacuationCenters}
                    rowClassName={(_, idx) => idx === 0 ? 'evac-row-highlight' : ''}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResidentEvacuationCenter;