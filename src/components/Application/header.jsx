import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import theme from '../../theme';




const Header = ({ drawerWidth, handleDrawerToggle }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    console.log(user.userObject.name)

    return ( 
        <AppBar
        position="fixed"
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
            <Typography variant="h6" noWrap >
                Responsive drawer
            </Typography>
            <Box maxWidth sx={{  justifySelf: "right", display: "flex" }} justifyContent="right">
                <IconButton sx={{ color: "white" }} >
                    <NotificationsRoundedIcon  />
                </IconButton>
                <IconButton sx={{ color: "white" }} >
                    <SettingsIcon />
                </IconButton>
                <IconButton >
                    <Avatar />
                    {user.userObject.name}
                </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
    )
};

export default Header;