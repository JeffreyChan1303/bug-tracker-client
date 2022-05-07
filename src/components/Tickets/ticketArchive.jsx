import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const TicketArchive = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Ticket Archive
            </Typography>
        </Box>
    )
};

export default TicketArchive;