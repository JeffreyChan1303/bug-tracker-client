import React, { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emailVerification } from '../../services/user/userSlice';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    dispatch(emailVerification(token));
    // navigate('/auth');
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      position="absolute"
      sx={{ left: 0, right: 0, top: 0, bottom: '10vh' }}
    >
      <Typography variant="h4">
        {' '}
        Enter your email and password here to send another verification email.{' '}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/auth')}>
        Go Back To Login
      </Button>
    </Grid>
  );
};

export default EmailVerification;
