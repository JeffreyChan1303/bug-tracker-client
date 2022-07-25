import { Typography } from '@mui/material';
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { emailVerification } from '../../services/user/userSlice';

const EmailVerification = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    dispatch(emailVerification(token));
    // navigate('/auth');
  }, []);

  return <Typography variant="h4"> veriffing email </Typography>;
};

export default EmailVerification;
