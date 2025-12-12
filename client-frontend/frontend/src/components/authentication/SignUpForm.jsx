import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    contactNumber: '',
    location: '',
    zone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target. name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up data:', formData);
    // TODO: Add API call here
  };

  return (
    <div className="auth-card">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Zone</label>
          <input
            type="text"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>

        <p className="auth-link">
          Already have an account? {' '}
          <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;