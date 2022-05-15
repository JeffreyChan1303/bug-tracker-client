import React from 'react';
import { Box, Typography, Toolbar, Paper } from '@mui/material';

const TicketDetails = ({ drawerWidth }) => {

    return (
        <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Ticket Details
            </Typography>

            <Paper sx={{ p: 3 }} elevation={3}>
                
            </Paper>
        </Box>
    )
};

export default TicketDetails;