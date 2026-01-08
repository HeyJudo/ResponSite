/**
 * Form Validation Utilities
 * Real-time validation with helpful error messages
 */

// Validation rules
export const validators = {
  // Required field
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Email validation
  email: (value) => {
    if (!value) return null; // Let required handle empty
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  // Phone number validation (Philippine format)
  phone: (value) => {
    if (!value) return null;
    // Remove spaces and dashes
    const cleaned = value.replace(/[\s-]/g, '');
    // Accept: 09XXXXXXXXX, +639XXXXXXXXX, 639XXXXXXXXX
    const phoneRegex = /^(\+?63|0)?9\d{9}$/;
    if (!phoneRegex.test(cleaned)) {
      return 'Please enter a valid phone number (e.g., 09123456789)';
    }
    return null;
  },

  // Minimum length
  minLength: (min) => (value, fieldName = 'This field') => {
    if (!value) return null;
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  // Maximum length
  maxLength: (max) => (value, fieldName = 'This field') => {
    if (!value) return null;
    if (value.length > max) {
      return `${fieldName} must be less than ${max} characters`;
    }
    return null;
  },

  // Password strength
  password: (value) => {
    if (!value) return null;
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }
    return null;
  },

  // Simple password (less strict)
  simplePassword: (value) => {
    if (!value) return null;
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  },

  // Confirm password match
  confirmPassword: (password) => (value) => {
    if (!value) return null;
    if (value !== password) {
      return 'Passwords do not match';
    }
    return null;
  },

  // Number only
  number: (value) => {
    if (!value) return null;
    if (isNaN(Number(value))) {
      return 'Please enter a valid number';
    }
    return null;
  },

  // Positive number
  positiveNumber: (value, fieldName = 'This field') => {
    if (!value) return null;
    const num = Number(value);
    if (isNaN(num) || num < 0) {
      return `${fieldName} must be a positive number`;
    }
    return null;
  },

  // Integer only
  integer: (value, fieldName = 'This field') => {
    if (!value) return null;
    if (!Number.isInteger(Number(value))) {
      return `${fieldName} must be a whole number`;
    }
    return null;
  },

  // Range validation
  range: (min, max) => (value, fieldName = 'Value') => {
    if (!value) return null;
    const num = Number(value);
    if (isNaN(num) || num < min || num > max) {
      return `${fieldName} must be between ${min} and ${max}`;
    }
    return null;
  },

  // Name validation (letters, spaces, hyphens, apostrophes)
  name: (value) => {
    if (!value) return null;
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(value)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return null;
  },

  // Username validation
  username: (value) => {
    if (!value) return null;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(value)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    if (value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    return null;
  },

  // URL validation
  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  // Date validation (not in past)
  futureDate: (value) => {
    if (!value) return null;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return 'Date cannot be in the past';
    }
    return null;
  },

  // Date validation (not in future)
  pastDate: (value) => {
    if (!value) return null;
    const date = new Date(value);
    const today = new Date();
    if (date > today) {
      return 'Date cannot be in the future';
    }
    return null;
  },
};

/**
 * Validate a single field
 * @param {any} value - The value to validate
 * @param {Array} rules - Array of validation functions
 * @param {string} fieldName - Field name for error messages
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (value, rules = [], fieldName = '') => {
  for (const rule of rules) {
    const error = typeof rule === 'function' ? rule(value, fieldName) : null;
    if (error) return error;
  }
  return null;
};

/**
 * Validate entire form
 * @param {Object} values - Form values object
 * @param {Object} validationSchema - Schema with field names and their rules
 * @returns {Object} - Object with field names and their errors
 */
export const validateForm = (values, validationSchema) => {
  const errors = {};
  
  for (const [fieldName, config] of Object.entries(validationSchema)) {
    const { rules = [], label = fieldName } = config;
    const error = validateField(values[fieldName], rules, label);
    if (error) {
      errors[fieldName] = error;
    }
  }
  
  return errors;
};

/**
 * Check if form has errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * Common validation schemas for reuse
 */
export const commonSchemas = {
  login: {
    email: {
      label: 'Email',
      rules: [validators.required, validators.email],
    },
    password: {
      label: 'Password',
      rules: [validators.required],
    },
  },
  
  signup: {
    firstName: {
      label: 'First name',
      rules: [validators.required, validators.name],
    },
    lastName: {
      label: 'Last name',
      rules: [validators.required, validators.name],
    },
    email: {
      label: 'Email',
      rules: [validators.required, validators.email],
    },
    phone: {
      label: 'Phone number',
      rules: [validators.phone],
    },
    password: {
      label: 'Password',
      rules: [validators.required, validators.simplePassword],
    },
  },
  
  incident: {
    type: {
      label: 'Incident type',
      rules: [validators.required],
    },
    description: {
      label: 'Description',
      rules: [validators.required, validators.minLength(10)],
    },
    location: {
      label: 'Location',
      rules: [validators.required],
    },
  },
  
  resource: {
    name: {
      label: 'Resource name',
      rules: [validators.required],
    },
    quantity: {
      label: 'Quantity',
      rules: [validators.required, validators.positiveNumber, validators.integer],
    },
  },
  
  evacuationCenter: {
    name: {
      label: 'Center name',
      rules: [validators.required],
    },
    address: {
      label: 'Address',
      rules: [validators.required],
    },
    capacity: {
      label: 'Capacity',
      rules: [validators.required, validators.positiveNumber, validators.integer],
    },
  },
};

export default validators;
