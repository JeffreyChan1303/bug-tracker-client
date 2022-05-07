import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import { useGetAllTicketsQuery } from '../../services/api';


const AllTickets = ({ drawerWidth }) => {
    const { data, isFetching } = useGetAllTicketsQuery();
    console.log(data);

    if(isFetching) {
        return 'Loading...';
    }

    return (
        <Box
        sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            <Typography paragraph>
                All Tickets
            </Typography>
        </Box>
    )
};

export default AllTickets;