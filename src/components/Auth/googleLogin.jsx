import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { userActions } from '../../services/user/userSlice';
import { googleSignin } from '../../services/user/authSlice';

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // this function only executes if the user successgully logs into thier google account
  const handleCallbackResponse = async (response) => {
    console.log('Embedded JWT Token: ', response.credential);
    const userObject = jwtDecode(response.credential);
    const token = response.credential;
    console.log(userObject);
    console.log(response);
    await dispatch(googleSignin({ userObject, token }));
    // await dispatch(userActions.auth({ userObject, token }));
    navigate('/');
  };

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

  return <div style={{ display: 'flex', justifyContent: 'center' }} id="googleSignIn" />;
};

export default GoogleLogin;
