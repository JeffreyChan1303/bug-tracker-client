/* global google */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Avatar, Grid, Icon } from '@mui/material';
import { GoogleLogin } from 'react-google-login';


import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './input'
import './background.css';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        console.log("running use effect");
        google.accounts.id.initialize({
            client_id: "351304157120-mt2uc9pv4rqplrod4gkosjr8h8mqskj2.apps.googleusercontent.com",
        });
        google.accounts.id.prompt(notification => {
            console.log("on prompt notification", notification);
        })
    }, []);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


    };

    // when input is typed in
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    const handleGoogleSuccess = async (res) => {
        console.log(res)
    }

    const handleGoogleFailure = (error) => {
        console.log("Google sign in failed")
        console.log(error)
    }

    return (
        <>
            <Box className="login-page-background" sx={{ p: "0 5vw" }}>
                <Typography variant="h1" fontWeight={700} sx={{ color: "white" }}>
                    THIS IS THE LOGIN PAGE!!
                </Typography>


                <Paper elevation={20} sx={{ p: 2, maxWidth: "350px" }}>
                    <Box maxWidth sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar sx={{ bgcolor: "primary.main"}}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Box>
                    <Typography variant="h5" textAlign="center" >{isSignup? 'Sign Up' : 'Sign In' }</Typography>
                    <form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            { isSignup && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                            
                        </Grid>

                        <GoogleLogin 
                            clientId="351304157120-mt2uc9pv4rqplrod4gkosjr8h8mqskj2.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button 
                                    sx={{}} 
                                    variant="contained"
                                    color="primary" 
                                    fullWidth 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            cookiePolicy="single_host_origin"
                        />

                        <Button type="submit" fullWidth variant="contained" color="primary" size="small" sx={{ m: "20px 0 10px" }}>
                            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Button>

                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode} >
                                    { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                                </Button>
                            </Grid>
                        </Grid>

                        {!isSignup &&
                            <>
                                <Typography textAlign="center">
                                    OR
                                </Typography>

                                <Box sx={{display: "flex", m: "10px 0"}} justifyContent="space-evenly" >
                                    <Button variant="outlined">Demo 1</Button>
                                    <Button variant="outlined">Demo 2</Button>
                                    <Button variant="outlined">Demo 3</Button>
                                </Box>
                                <Box sx={{display: "flex"}} justifyContent="center" gap={3}>
                                    <Button variant="outlined">Demo 4</Button>
                                    <Button variant="outlined">Demo 5</Button>
                                </Box>
                            </>
                        }
                    </form>
                </Paper>



            </Box>
        </>
    )
}

export default Auth;