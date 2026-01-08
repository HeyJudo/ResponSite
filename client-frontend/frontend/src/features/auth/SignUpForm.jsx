import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import { useToast } from '../../components/Toast';
import { registerUser } from '../../API/authService';
import { validators, validateField } from '../../utils/validation';
import '../../styles/resident/auth.css';

const SignUpForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    contactNumber: '',
    address: '',
    zone: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validation rules for each field
  const validationRules = {
    username: [validators.required, validators.username],
    email: [validators.required, validators.email],
    password: [validators.required, validators.simplePassword],
    fullName: [validators.required, validators.name],
    contactNumber: [validators.required, validators.phone],
    address: [validators.required],
    zone: [validators.required],
  };

  const validateFieldValue = useCallback((name, value) => {
    const rules = validationRules[name] || [];
    return validateField(value, rules, name);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateFieldValue(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateFieldValue(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
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
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.warning('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerUser(formData);
      toast.success('Registration successful! Please sign in.');
      navigate('/signin');
    } catch (err) {
      setLoading(false);
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const getInputClassName = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'input-error' : 'input-valid';
  };

  return (
    <div className="auth-card">
      {loading && <LoadingScreen />}
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username <span className="required">*</span></label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('username')}
            placeholder="Enter username"
          />
          {touched.username && errors.username && (
            <span className="field-error">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('email')}
            placeholder="Enter email address"
          />
          {touched.email && errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password <span className="required">*</span></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('password')}
            placeholder="Enter password (min 6 characters)"
          />
          {touched.password && errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label>Full Name <span className="required">*</span></label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('fullName')}
            placeholder="Enter your full name"
          />
          {touched.fullName && errors.fullName && (
            <span className="field-error">{errors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Contact Number <span className="required">*</span></label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('contactNumber')}
            placeholder="e.g., 09123456789"
          />
          {touched.contactNumber && errors.contactNumber && (
            <span className="field-error">{errors.contactNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>Address <span className="required">*</span></label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('address')}
            placeholder="Enter your address"
          />
          {touched.address && errors.address && (
            <span className="field-error">{errors.address}</span>
          )}
        </div>

        <div className="form-group">
          <label>Zone <span className="required">*</span></label>
          <input
            type="text"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('zone')}
            placeholder="Enter your zone"
          />
          {touched.zone && errors.zone && (
            <span className="field-error">{errors.zone}</span>
          )}
        </div>

        {error && <div className="form-error">{error}</div>}

        <button type="submit" className="register-btn" disabled={loading}>
          Register
        </button>

        <p className="auth-link">
          Already have an account?{' '}
          <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
