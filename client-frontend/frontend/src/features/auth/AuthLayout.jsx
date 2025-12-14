import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../../styles/resident/auth.css';

const AuthLayout = ({ leftContent, rightContent }) => {
  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="logo">
          <span className="logo-circle"></span>
          <span className="logo-text">RESPONSITE</span>
        </div>
      </header>
      <div className="auth-content">
        <div className="auth-left">
          <div className="outer-card">
            <div className="inner-card">
              {leftContent}
            </div>
          </div>
        </div>
        <div className="auth-right">
          <div className="outer-card">
            <div className="inner-card">
              {rightContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
