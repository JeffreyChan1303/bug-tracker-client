import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import { useGetAllTicketsQuery } from '../../services/api';


const AllTickets = ({ drawerWidth }) => {
    const { data, isFetching } = useGetAllTicketsQuery();
    console.log(data);

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