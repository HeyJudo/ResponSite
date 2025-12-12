import AuthLayout from '../components/authentication/AuthLayout';
import AboutCard from '../components/authentication/AboutCard';
import LoginForm from '../components/authentication/LoginForm';

const LoginPage = () => (
  <AuthLayout leftContent={<AboutCard />} rightContent={<LoginForm />} />
);

export default LoginPage;