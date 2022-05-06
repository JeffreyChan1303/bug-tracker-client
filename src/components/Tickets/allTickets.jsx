import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography, Toolbar } from '@mui/material';

import { Link } from 'react-router-dom';


const AllTickets = ({ drawerWidth }) => {
    const tickets = useSelector((state) => state.tickets);

    console.log(tickets);

    return (
        <Box
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            <Typography paragraph>
                All Tickets
            </Typography>
        </Box>
    )
};

export default AllTickets;