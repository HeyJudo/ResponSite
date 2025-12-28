import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import { loginUser } from '../../API/authService';


const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(formData.username, formData.password);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      
      // Dispatch event to update contexts
      window.dispatchEvent(new Event('userLogin'));
      
      // Route based on role
      const role = response.role;
      if (role === 'ADMIN') {
        navigate('/admDashboard');
      } else if (role === 'STAFF' || role === 'LGU') {
        navigate('/lguDashboard');
      } else if (role === 'RESIDENT') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard'); // Default fallback
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="auth-card">
      {loading && <LoadingScreen />}
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type="submit" className="register-btn" disabled={loading}>Login</button>
        <p className="auth-link">
          Don't have an account?{' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
