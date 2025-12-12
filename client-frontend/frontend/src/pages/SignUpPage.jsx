import AuthLayout from '../components/authentication/AuthLayout';
import AboutCard from '../components/authentication/AboutCard';
import SignUpForm from '../components/authentication/SignUpForm';

const SignUpPage = () => {
  return (
    <AuthLayout
      leftContent={<AboutCard />}
      rightContent={<SignUpForm />}
    />
  );
};

export default SignUpPage;