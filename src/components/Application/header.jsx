import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, IconButton, Avatar, Box, Menu, MenuItem, Button, Tooltip, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';


import store from '../../app/store';
import { userActions } from '../../services/user/userSlice';
import { handleAlerts } from '../../services/alertsSlice';



const Header = ({ drawerWidth, handleDrawerToggle }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [avatarOpen, setAvatarOpen] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(user?.userObject.name)
    const handleLogOut = () => {
        store.dispatch(userActions.logout())
    }

    // this is the guard for a user that doesn't have a valid token while on the app.
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch(handleAlerts({ severity: 'info', message: 'Your login session has expired. Please login again.'}));
                handleLogOut();
            }
        }
    }, [location])

    const handleAvatarOpen = (event) => {
        setAvatarOpen(event.currentTarget);
    }
    const handleAvatarClose = () => {
        setAvatarOpen(null);
    }

    return ( 
        <AppBar
            position="fixed"
            color="primary"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` }, // ml == margin left
            }}
            elevation={3}
        >
            <Toolbar sx={{ justifyContent: "space-between" }} >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>


                <Typography variant="h6" noWrap>
                    Responsive drawer 
                </Typography>

                {user.userObject.name}

                {/* FIX THIS BUTTON!!!!.. learn how to use MUI theme and pallete stuff with the color of the components */}
                <Box sx={{ display: "flex" }} justifyContent="right" alignItems="center" >
                    <Button 
                        size="small"
                        variant="contained" 
                        onClick={() => navigate('/addTicket')}
                        sx={{ color: "white", bgcolor: "primary.light", textTransform: 'none', mr: '5px' }}
                    >
                        <Typography variant="body1">
                            New Ticket
                        </Typography>
                    </Button>

                    <IconButton sx={{ color: "white" }} onClick={() => navigate('/notifications')} >
                        {/* Change the badge content to the user.unreadNotifications! I will need to implement this in the backend too */}
                        <Badge color="error" badgeContent={1} >
                            <NotificationsRoundedIcon  />
                        </Badge>
                    </IconButton>

                    <Tooltip title="settings(in progress)" >
                        <IconButton sx={{ color: "white" }} >
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    <IconButton
                        onClick={handleAvatarOpen}
                    >
                        <Avatar />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={avatarOpen}
                        open={Boolean(avatarOpen)}
                        onClose={handleAvatarClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleAvatarClose}>Profile</MenuItem>
                        <MenuItem onClick={handleAvatarClose}>My account</MenuItem>
                        {/* <MenuItem onClick={handleAvatarClose}>{user?.userObject.name}</MenuItem> */}
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
};

export default Header;