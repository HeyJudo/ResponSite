import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login check
    if (formData.username === 'resident' && formData.password === '123') {
      navigate('/dashboard');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className="auth-card">
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
        <button type="submit" className="register-btn">Login</button>
        <p className="auth-link">
          Don't have an account?{' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;