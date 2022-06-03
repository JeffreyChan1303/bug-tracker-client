import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Avatar, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import store from '../../app/store';
import { userActions } from '../../services/user/userSlice';
import { signIn, signUp } from '../../services/user/authSlice';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './input'
import './background.css';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({}); // this should be put in redux
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword(!showPassword);

    function handleCallbackResponse(response) {
        console.log("Embedded JWT Token: " + response.credential)
        const userObject = jwt_decode(response.credential)
        const token = response.credential
        console.log(userObject);
        console.log(response)
        store.dispatch(userActions.auth({ userObject, token }))
        window.location.reload();
    }

    // uses google identity services
    useEffect(() => {
        /* global google */
        console.log("running use effect");

        google?.accounts.id.initialize({
            client_id: "351304157120-mt2uc9pv4rqplrod4gkosjr8h8mqskj2.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });
        google?.accounts.id.renderButton(
            document.getElementById("googleSignIn"),
            { type: "standard", theme: "outline", size: "medium", shape: "circle", text: "signin_with" },
        );
        google?.accounts.id.prompt();
    }, []);

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signUp(formData));
        } else {
            dispatch(signIn(formData));
        }
    };

    // when input is typed in
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


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

                        <Button type="submit" fullWidth variant="contained" color="primary" size="small" sx={{ m: "20px 0 10px" }}>
                            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Button>

                        <Box sx={{ display: "flex", justifyContent: "center" }} id="googleSignIn"></Box>

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