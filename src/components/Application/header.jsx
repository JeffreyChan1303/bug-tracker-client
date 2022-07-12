import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, IconButton, Avatar, Box, Menu, MenuItem, Button, Tooltip, Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate } from 'react-router-dom';

import { getUnreadNotifications } from '../../services/dashboardSlice';


const Header = ({ drawerWidth, handleDrawerToggle, user, handleLogOut }) => {
    const [avatarOpen, setAvatarOpen] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getUnreadNotifications: { data: numberOfUnreadNotifications } } = useSelector((state) => state.dashboard)

    useEffect(() => {
        dispatch(getUnreadNotifications())
    }, [])

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
                        <Badge color="error" badgeContent={nunmberOfUnreadNotifications} >
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