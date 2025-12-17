const Form = ({ title, onSubmit, fields, submitLabel, bottomText, bottomLink, bottomLinkText, children }) => (
  <div className="auth-card">
    <h2 className="form-title">{title}</h2>
    <form onSubmit={onSubmit} className="auth-form">
      {fields?.map(({ label, name, type = 'text', value, onChange, ...rest }, idx) => (
        <div className="form-group" key={idx}>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required
            {...rest}
          />
        </div>
      ))}
      {children}
      <button type="submit" className="register-btn">{submitLabel}</button>
      {bottomText && (
        <p className="auth-link">
          {bottomText}{' '}
          {bottomLink && <a href={bottomLink}>{bottomLinkText}</a>}
        </p>
      )}
    </form>
  </div>
);

export default Form;
