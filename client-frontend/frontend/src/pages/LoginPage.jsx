import AuthLayout from '../features/auth/AuthLayout';
import AboutCard from '../features/auth/AboutCard';
import LoginForm from '../features/auth/LoginForm';

const LoginPage = () => (
  <AuthLayout leftContent={<AboutCard />} rightContent={<LoginForm />} />
);

export default LoginPage;