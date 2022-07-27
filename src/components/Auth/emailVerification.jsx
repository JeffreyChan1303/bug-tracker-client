import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emailVerification, sendNewVerificationLink } from '../../services/user/userSlice';
import Input from './input';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const { token } = useParams();

  const {
    emailVerification: { success: verified },
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (token !== 'auth') {
      dispatch(emailVerification(token));
    }
  }, []);

  console.log(verified);
  if (verified) {
    navigate('/auth');
  }

  const handleSendNewVerificationLink = () => {
    dispatch(sendNewVerificationLink(email));
  };

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
      <Paper sx={{ p: 3, maxWidth: '350px' }} elevation={1}>
        <form>
          <Grid container justifyContent="center" direction="column" gap={1}>
            <Typography variant="h6" textAlign="center">
              Enter your email and password here to send another verification email.
            </Typography>
            <Input
              name="email"
              label="Email Address"
              handleChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Button variant="contained" onClick={handleSendNewVerificationLink}>
              Send new verification link
            </Button>
          </Grid>
        </form>
      </Paper>
      <Button variant="outlined" onClick={() => navigate('/auth')}>
        Go Back To Login
      </Button>
    </Grid>
  );
};

export default EmailVerification;
