import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, CssBaseline, Box, Toolbar } from '@mui/material';
import decode from 'jwt-decode';
import { Header, Navbar, EmailVerification } from './components/Application/index';
import AppRoutes from './components/appRoutes';
import { userActions, setAuthData } from './services/user/userSlice';
import { handleAlerts } from './services/alertsSlice';
import Alert from './components/Application/alert';
import Auth from './components/Auth/auth';

const drawerWidth = 260;

const App = () => {
  // we can change this user constant into auth data to check if the user is loged in or not
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // if the user is already stored in local storage, this would set the userObject as a global state with redux
  useEffect(() => {
    dispatch(setAuthData());
  }, []);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    dispatch(userActions.logout());
    navigate('/');
  };

  // this is the guard for a user that doesn't have a valid token while on the app.
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      console.log(decodedToken);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(
          handleAlerts({
            severity: 'info',
            message: 'Your login session has expired. Please login again.',
          })
        );
        handleLogOut();
      }
    }
  }, [location]);

  return (
    <>
      {!user ? (
        <Routes>
          <Route exact path="/*" element={<Navigate to="/auth" replace />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/verification/:token" element={<EmailVerification />} />
        </Routes>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
            user={user}
            handleLogOut={handleLogOut}
          />

          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="navigation drawer"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              <Navbar user={user} />
            </Drawer>

            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' }, // hides in mobile view
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              <Navbar user={user} />
            </Drawer>
          </Box>

          {/* Here is the content and the routes */}
          <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />

            {/* This is the routes for everything in the main application */}
            <AppRoutes />
          </Box>
        </Box>
      )}

      {/* Alerts */}
      <Alert />
    </>
  );
};

export default App;
