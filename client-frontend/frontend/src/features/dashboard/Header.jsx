import userDefaultSvg from '../../assets/user-default.svg';

const Header = () => (
  <header className="dashboard-header">
    <div />
    <div className="user-info">
      <span>resident</span>
      <img src={userDefaultSvg} alt="User Icon" className="user-icon" />
    </div>
  </header>
);

export default Header;
