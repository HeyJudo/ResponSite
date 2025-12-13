import Sidebar from '../components/resident_dashboard/Sidebar';
import Header from '../components/resident_dashboard/Header';
import evacuationCenters from '../API/evacuationCenter';
import '../styles/global.css';
import '../styles/center.css';


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
          <div className="evac-panel">
            <div className="evac-title-card">
              <span className="evac-title">Evacuation Centers</span>
            </div>
            <div className="evac-table-card">
              <table className="evac-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {evacuationCenters.map((center, idx) => (
                    <tr key={center.name} className={idx === 0 ? "evac-row-highlight" : ""}>
                      <td>{center.name}</td>
                      <td>{center.location}</td>
                      <td>
                        <span className={`evac-status ${center.status.toLowerCase()}`}>
                          {center.status}
                        </span>
                      </td>
                      <td>{center.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentEvacuationCenter;