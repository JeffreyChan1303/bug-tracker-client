import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const EditTicket = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Edit Ticket
            </Typography>
        </Box>
    )
};

export default EditTicket;