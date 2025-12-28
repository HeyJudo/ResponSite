import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { AdminProfileProvider } from './context/AdminProfileContext';
import { LguProfileProvider } from './context/LguProfileContext';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

import ResidentDashboard from './pages/resident/ResidentDashboard';
import ResidentMyReports from './pages/resident/ResidentMyReports';
import ResidentMyReportDetails from './pages/resident/ResidentMyReportsDetails';
import ResidentEvacuationCenter from './pages/resident/ResidentEvacuationCenter';
import ResidentInfraProjects from './pages/resident/ResidentInfraProjects';
import ResidentInfraProjectsDet from './pages/resident/ResidentInfraProjectsDet';

import AdmDashboard from './pages/admin/admDashboard';
import AdmIncidentReports from './pages/admin/admIncidentReports';
import AdmIncidentReportsDet from './pages/admin/admIncidentReportsDet';
import AdmResourceManagement from './pages/admin/admResourceManagement';
import AdmListOfUsers from './pages/admin/admListOfUsers';
import AdmListOfPendingUsers from './pages/admin/admListOfPendingUsers';
import AdmInfraProjects from './pages/admin/admInfraProjects';
import AdmInfraProjectsDet from './pages/admin/admInfraProjectsDet';
import AdmListOfFeedbacks from './pages/admin/admListOfFeedbacks';
import AdmEvacuationCenter from './pages/admin/admEvacuationCenter';

import LguDashboard from './pages/lgu/lguDashboard';
import LguIncidentReports from './pages/lgu/lguIncidentReports';
import LguIncidentReportsDet from './pages/lgu/lguIncidentReportsDet';
import LguResourceManagement from './pages/lgu/lguResourceManagement';
import LguEvacuationCenter from './pages/lgu/lguEvacuationCenter';
import LguInfraProjects from './pages/lgu/lguInfraProjects';

function App() {
  return (
    <ProfileProvider>
      <AdminProfileProvider>
        <LguProfileProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/dashboard" element={<ResidentDashboard />} />
            <Route path="/incident-reports" element={<ResidentMyReports />} />
            <Route path="/incident-reports/:id" element={<ResidentMyReportDetails />} />
            <Route path="/infrastructure-projects" element={<ResidentInfraProjects />} />
            <Route path="/residentInfraProjectsDet" element={<ResidentInfraProjectsDet />} />
            <Route path="/evacuation-center" element={<ResidentEvacuationCenter />} />

            <Route path="/admDashboard" element={<AdmDashboard />} />
            <Route path="/admIncidentReports" element={<AdmIncidentReports />} />
            <Route path="/admIncidentReportsDet/:incidentId" element={<AdmIncidentReportsDet />} />
            <Route path="/admResourceManagement" element={<AdmResourceManagement />} />
            <Route path="/admEvacuationCenter" element={<AdmEvacuationCenter />} />
            <Route path="/admInfraProjects" element={<AdmInfraProjects />} />
            <Route path="/admInfraProjectsDet" element={<AdmInfraProjectsDet />} />
            <Route path="/admListOfFeedbacks" element={<AdmListOfFeedbacks />} />
            <Route path="/admListOfUsers" element={<AdmListOfUsers />} />
            <Route path="/admListOfPendingUsers" element={<AdmListOfPendingUsers />} />

            <Route path="/lguDashboard" element={<LguDashboard />} />
            <Route path="/lguIncidentReports" element={<LguIncidentReports />} />
            <Route path="/lguIncidentReportsDet/:incidentId" element={<LguIncidentReportsDet />} />
            <Route path="/lguResourceManagement" element={<LguResourceManagement />} />
            <Route path="/lguEvacuationCenter" element={<LguEvacuationCenter />} />
            <Route path="/lguInfraProjects" element={<LguInfraProjects />} />
          </Routes>
        </Router>
      </LguProfileProvider>
    </AdminProfileProvider>
  </ProfileProvider>
  );
}

export default App;