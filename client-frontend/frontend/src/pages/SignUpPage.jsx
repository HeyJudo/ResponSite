import AuthLayout from '../components/AuthLayout';
import AboutCard from '../components/AboutCard';
import SignUpForm from '../components/SignUpForm';

const SignUpPage = () => {
  return (
    <AuthLayout
      leftContent={<AboutCard />}
      rightContent={<SignUpForm />}
    />
  );
};

export default SignUpPage;