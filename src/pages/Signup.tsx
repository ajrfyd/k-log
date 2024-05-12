import { useEffect, useState } from 'react';
import SignupForm from '@components/user/SignupForm';
import { useNavigate } from 'react-router-dom';
import { type NewUserResponseType } from '@/lib/api/types';

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const signupSuccessHandler = (data: NewUserResponseType) => {
    console.log(data);
    setSuccess(true);
  };

  useEffect(() => {
    if (!success) return;
    navigate('/', { replace: true });
  }, [success]);

  return <SignupForm signupSuccessHandler={signupSuccessHandler} />;
};

export default Signup;
