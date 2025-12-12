import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ResidentDashboard from './pages/ResidentDashboard';
import ResidentEvacuationCenter from './pages/ResidentEvacuationCenter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/dashboard" element={<ResidentDashboard />} />
        <Route path="/evacuation-center" element={<ResidentEvacuationCenter />} />
      </Routes>
    </Router>
  );
}

export default App;