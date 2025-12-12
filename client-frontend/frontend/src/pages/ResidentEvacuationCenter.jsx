import React from 'react';
import Sidebar from '../components/resident_dashboard/Sidebar.jsx';
import Header from '../components/resident_dashboard/Header.jsx';

import '../styles/global.css';
import '../styles/center.css';

const ResidentEvacuationCenter = () => {
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
        </div>
      </div>
    </div>
  );
};

export default ResidentEvacuationCenter;
