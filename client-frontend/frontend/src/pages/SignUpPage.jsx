import AuthLayout from '../features/auth/AuthLayout';
import AboutCard from '../features/auth/AboutCard';
import SignUpForm from '../features/auth/SignUpForm';

const SignUpPage = () => (
  <AuthLayout leftContent={<AboutCard />} rightContent={<SignUpForm />} />
);

export default SignUpPage;