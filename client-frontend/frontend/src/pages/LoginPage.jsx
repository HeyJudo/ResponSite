import AuthLayout from '../components/AuthLayout';
import AboutCard from '../components/AboutCard';
import LoginForm from '../components/LoginForm';

const LoginPage = () => (
  <AuthLayout leftContent={<AboutCard />} rightContent={<LoginForm />} />
);

export default LoginPage;