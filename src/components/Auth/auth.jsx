import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Avatar, Grid } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

// import store from '../../app/store';
import { userActions } from '../../services/user/userSlice';
import { signIn, signUp } from '../../services/user/authSlice';

import Input from './input';
import './background.css';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  function handleCallbackResponse(response) {
    console.log('Embedded JWT Token: ', response.credential);
    const userObject = jwtDecode(response.credential);
    const token = response.credential;
    console.log(userObject);
    console.log(response);
    dispatch(userActions.auth({ userObject, token }));
    window.location.reload();
  }

  // uses google identity services
  useEffect(() => {
    /* global google */
    google?.accounts.id.initialize({
      client_id: '351304157120-mt2uc9pv4rqplrod4gkosjr8h8mqskj2.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    google?.accounts.id.renderButton(document.getElementById('googleSignIn'), {
      type: 'standard',
      theme: 'outline',
      size: 'medium',
      shape: 'circle',
      text: 'signin_with',
    });
    google?.accounts.id.prompt();
  }, []);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // const { signUpSuccess } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (isSignup) {
      await dispatch(signUp(formData));
      // if (signUpSuccess) {
      //   navigate('/verification');
      // }
    } else {
      await dispatch(signIn(formData));
      navigate('/');
    }
  };

  // when input is typed in
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // demo logins
  const loginToDemoAdmin = async () => {
    await dispatch(signIn({ email: 'Demo_Admin@bugtracker.com', password: 'DemoAdminPassword' }));
    navigate('/auth');
  };
  const loginToDemoDeveloper = async () => {
    await dispatch(
      signIn({ email: 'Demo_Developer@bugtracker.com', password: 'DemoDeveloperPassword' })
    );
    navigate('/auth');
  };
  const loginToDemoProductManager = async () => {
    await dispatch(
      signIn({
        email: 'Demo_Project_Manager@bugtracker.com',
        password: 'DemoProjectManagerPassword',
      })
    );
    navigate('/auth');
  };

  return (
    <Grid container className="login-page-background" justifyContent="space-around">
      <Box className="login-page-background-cover" />

      <Grid item xs={12} lg={5} display="flex" alignItems="center" justifyContent="center">
        <Paper elevation={20} sx={{ p: 2, minWidth: '350px', width: '30%' }}>
          <Box maxWidth sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>

          <Typography variant="h5" textAlign="center">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Typography variant="body2" textAlign="center" fontWeight={200}>
            Keep track of your personal and professional projects
          </Typography>
          <form style={{ marginTop: '10px' }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="small"
              sx={{ m: '20px 0 10px' }}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center' }} id="googleSignIn" />

            <Grid container justify="flex-end">
              <Grid item sx={{ display: 'flex' }}>
                {isSignup ? (
                  <>
                    <Typography variant="body1" padding={1}>
                      Already have an account?
                    </Typography>
                    <Button sx={{ textTransform: 'none' }} onClick={switchMode}>
                      Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body1" padding={1}>
                      Don&apos;t have an account?
                    </Typography>
                    <Button sx={{ textTransform: 'none' }} onClick={switchMode}>
                      Sign Up
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <Typography variant="body1" padding={1}>
                  Need to verify your account?
                </Typography>
                <Button
                  onClick={() => navigate('/verification/auth')}
                  sx={{ textTransform: 'none' }}
                  variant="text"
                >
                  Click Here
                </Button>
              </Grid>
            </Grid>

            {!isSignup && (
              <>
                <Typography textAlign="center">OR</Typography>

                <Box sx={{ display: 'flex', m: '10px 0' }} justifyContent="space-evenly">
                  <Button variant="outlined" onClick={loginToDemoAdmin}>
                    Demo Admin
                  </Button>
                  <Button variant="outlined" onClick={loginToDemoDeveloper}>
                    Demo Developer
                  </Button>
                </Box>
                <Box sx={{ display: 'flex' }} justifyContent="center" gap={3}>
                  <Button variant="outlined" onClick={loginToDemoProductManager}>
                    Demo Product Manager
                  </Button>
                </Box>
              </>
            )}
          </form>
        </Paper>
      </Grid>

      {/* <Grid
        item
        lg={7}
        alignItems="center"
        justifyContent="center"
        sx={{ display: { xs: 'none', lg: 'flex' } }}
      >
        <Typography variant="h2" fontWeight={700} sx={{ color: 'white' }}>
          Bug Tracker
        </Typography>
      </Grid> */}
    </Grid>
  );
};

export default Auth;
