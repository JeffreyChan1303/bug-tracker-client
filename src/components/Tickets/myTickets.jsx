import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

import { Link } from 'react-router-dom';


const MyTickets = ({ drawerWidth }) => {

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            <Typography paragraph>
                My Tickets
            </Typography>
        </Box>
    )
};

export default MyTickets;