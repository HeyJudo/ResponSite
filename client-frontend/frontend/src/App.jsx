import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

import ResidentDashboard from './pages/resident/ResidentDashboard';
import ResidentMyReports from './pages/resident/ResidentMyReports';
import ResidentMyReportDetails from './pages/resident/ResidentMyReportsDetails';
import ResidentEvacuationCenter from './pages/resident/ResidentEvacuationCenter';
import ResidentInfraProjects from './pages/resident/ResidentInfraProjects';

import AdmDashboard from './pages/admin/admDashboard';

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
      </Routes>
    </Router>
  );
}

export default App;