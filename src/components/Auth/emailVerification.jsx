import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

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
      paddingBottom={3}
      className="login-page-background"
    >
      <Paper sx={{ p: 3, maxWidth: '350px' }} elevation={1}>
        <form>
          <Grid container justifyContent="center" direction="column" gap={1}>
            <Typography variant="h6" textAlign="center">
              Enter your email here to send another verification email.
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
            <Box display="flex" justifyContent="center">
              <Button variant="outlined" sx={{ m: '0 auto' }} onClick={() => navigate('/auth')}>
                Go Back To Login
              </Button>
            </Box>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default EmailVerification;
