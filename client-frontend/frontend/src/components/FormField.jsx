const FormField = ({ label, type = 'text', name, value, onChange, options, placeholder }) => {
  if (type === 'select') {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <select 
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-input"
        >
          <option value="">Select...</option>
          {options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <textarea 
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input"
          rows="3"
        />
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input 
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
};

export default FormField;
