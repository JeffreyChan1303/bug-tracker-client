import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const MyProjects = ({ drawerWidth }) => {

    return (
        <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                My Projects
            </Typography>
        </Box>
    )
};

export default MyProjects;