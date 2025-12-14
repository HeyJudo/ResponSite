// Card.jsx
// Generic card component

const Card = ({ title, children, className = '', ...props }) => (
  <div className={`card ${className}`.trim()} {...props}>
    {title && <h3 className="card-title">{title}</h3>}
    {children}
  </div>
);

export default Card;
