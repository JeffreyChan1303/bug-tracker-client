import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const MyTickets = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                My Tickets
            </Typography>
        </Box>
    )
};

export default MyTickets;