import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, IconButton, Avatar, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsIcon from '@mui/icons-material/Settings';



const Header = ({ drawerWidth, handleDrawerToggle }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [avatarOpen, setAvatarOpen] = useState(null);

    console.log(user?.userObject.name)

    const handleAvatarOpen = (event) => {
        setAvatarOpen(event.currentTarget);
    }
    const handleAvatarClose = () => {
        setAvatarOpen(null);
    }
    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload();
    }

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
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            </Box>
        </Toolbar>
        </AppBar>
    )
};

export default Header;