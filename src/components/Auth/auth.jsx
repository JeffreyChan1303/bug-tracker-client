import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Grid,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

// import store from '../../app/store';
import { revertSignUpSuccess, signIn, signUp } from '../../services/user/authSlice';

import Input from './input';
import './background.css';
import GoogleLogin from './googleLogin';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const { signUpSuccess, loading } = useSelector((state) => state.auth);
  if (signUpSuccess) {
    navigate('/verification/auth');
    dispatch(revertSignUpSuccess());
  }
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (isSignup) {
      await dispatch(signUp(formData));
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
    <>
      {/* This backdrop shows as the user is signing in or signing up */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container className="login-page-background" justifyContent="space-around">
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
                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                />
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

              <GoogleLogin />

              <Grid container justify="flex-end">
                <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                  {isSignup ? (
                    <>
                      <Typography variant="body1" padding={1}>
                        Already have an account?
                      </Typography>
                      <Button
                        sx={{ textTransform: 'none', p: '1px 5px' }}
                        onClick={switchMode}
                        variant="outlined"
                      >
                        Sign In
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" padding={1}>
                        Don&apos;t have an account?
                      </Typography>
                      <Button
                        sx={{ textTransform: 'none', p: '0px 6px' }}
                        onClick={switchMode}
                        variant="outlined"
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </Grid>
                <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" padding={1}>
                    Need to verify your account?
                  </Typography>
                  <Button
                    onClick={() => navigate('/verification/auth')}
                    sx={{ textTransform: 'none', p: '1px 5px' }}
                    variant="outlined"
                  >
                    Verify Here
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
      </Grid>
    </>
  );
};

export default Auth;
