import React from 'react';
import { AppBar, Typography, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'



const Header = ({ drawerWidth, handleDrawerToggle }) => {

    return ( 
        <AppBar
        position="fixed"
        sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` }, // ml == margin left
        }}
        elevation={3}
        >
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Responsive drawer
            </Typography>
        </Toolbar>
        </AppBar>
    )
};

export default Header;