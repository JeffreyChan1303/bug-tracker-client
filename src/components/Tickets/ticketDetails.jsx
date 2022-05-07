import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const TicketDetails = ({ drawerWidth }) => {

    return (
        <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Ticket Details
            </Typography>
        </Box>
    )
};

export default TicketDetails;