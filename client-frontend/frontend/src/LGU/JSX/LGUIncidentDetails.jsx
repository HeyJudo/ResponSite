import "../CSS/LGUIncidentDetails.css";
import { incidentDetails } from "../JS/incidentDetailsData";

const LGUIncidentDetails = () => {
  return (
    <div className="details">
      <h2>Incident #{incidentDetails.id}</h2>

      <p><b>Type:</b> {incidentDetails.type}</p>
      <p><b>Severity:</b> {incidentDetails.severity}</p>
      <p><b>Zone:</b> {incidentDetails.zone}</p>
      <p><b>Location:</b> {incidentDetails.location}</p>
      <p><b>Description:</b> {incidentDetails.description}</p>

      <button>Mark as Resolved</button>
    </div>
  );
};

export default LGUIncidentDetails;
