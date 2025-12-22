import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

import ResidentDashboard from './pages/resident/ResidentDashboard';
import ResidentMyReports from './pages/resident/ResidentMyReports';
import ResidentMyReportDetails from './pages/resident/ResidentMyReportsDetails';
import ResidentEvacuationCenter from './pages/resident/ResidentEvacuationCenter';
import ResidentInfraProjects from './pages/resident/ResidentInfraProjects';

import AdmDashboard from './pages/admin/admDashboard';
import AdmIncidentReports from './pages/admin/admIncidentReports';
import AdmIncidentReportsDet from './pages/admin/admIncidentReportsDet';
import AdmResourceManagement from './pages/admin/admResourceManagement';
import AdmListOfUsers from './pages/admin/admListOfUsers';
import AdmListOfPendingUsers from './pages/admin/admListOfPendingUsers';
import AdmInfraProjects from './pages/admin/admInfraProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/dashboard" element={<ResidentDashboard />} />
        <Route path="/incident-reports" element={<ResidentMyReports />} />
        <Route path="/incident-reports/:id" element={<ResidentMyReportDetails />} />
        <Route path="/infrastructure-projects" element={<ResidentInfraProjects />} />
        <Route path="/evacuation-center" element={<ResidentEvacuationCenter />} />

        <Route path="/admDashboard" element={<AdmDashboard />} />
        <Route path="/admIncidentReports" element={<AdmIncidentReports />} />
        <Route path="/admIncidentReportsDet/:incidentId" element={<AdmIncidentReportsDet />} />
        <Route path="/admResourceManagement" element={<AdmResourceManagement />} />
        <Route path="/admInfraProjects" element={<AdmInfraProjects />} />
        <Route path="/admListOfUsers" element={<AdmListOfUsers />} />
        <Route path="/admListOfPendingUsers" element={<AdmListOfPendingUsers />} />
      </Routes>
    </Router>
  );
}

export default App;