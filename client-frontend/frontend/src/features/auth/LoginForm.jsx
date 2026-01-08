import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import { useToast } from '../../components/Toast';
import { loginUser } from '../../API/authService';
import { validators, validateField } from '../../utils/validation';

const LoginForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationRules = {
    username: [validators.required],
    password: [validators.required],
  };

  const validateFieldValue = useCallback((name, value) => {
    const rules = validationRules[name] || [];
    return validateField(value, rules, name);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateFieldValue(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateFieldValue(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const error = validateFieldValue(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ username: true, password: true });
    return isValid;
  };

  const getInputClassName = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'input-error' : 'input-valid';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await loginUser(formData.username, formData.password);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      
      // Dispatch event to update contexts
      window.dispatchEvent(new Event('userLogin'));

      toast.success('Login successful!');
      
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
      const errorMessage = err.message || 'Invalid username or password.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-card">
      {loading && <LoadingScreen />}
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username <span className="required">*</span></label>
          <input 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            onBlur={handleBlur}
            className={getInputClassName('username')}
            placeholder="Enter your username"
          />
          {touched.username && errors.username && (
            <span className="field-error">{errors.username}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password <span className="required">*</span></label>
          <input 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('password')}
            placeholder="Enter your password"
          />
          {touched.password && errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>
        {error && <div className="form-error">{error}</div>}
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
