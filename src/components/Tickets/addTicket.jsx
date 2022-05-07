import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const AddTicket = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Add Ticket
            </Typography>
        </Box>
    )
};

export default AddTicket;