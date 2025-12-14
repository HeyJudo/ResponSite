import Sidebar from '../features/dashboard/Sidebar';
import Header from '../features/dashboard/Header';
import evacuationCenters from '../API/evacuationCenter';
import Table from '../components/Table';
import '../styles/resident/global.css';
import '../styles/resident/resInfraProjects.css';


const ResidentEvacuationCenter = () => {
  // TODO: API Call - replace with real fetching logic
  // const [evacuationCenters, setEvacuationCenters] = useState([]);
  // useEffect(() => { fetchEvacuationCenters(); }, []);

  return (
    <div className="dashboard-root">
      <Header />
      <div className="dashboard-body-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>
        <div className="dashboard-right">
          <main className="right-panel">
            <div className="incident-reports-wrapper">
              <div className="incident-header">Evacuation Centers</div>
              <div className="table-container">
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResidentEvacuationCenter;