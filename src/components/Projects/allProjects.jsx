import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const AllProjects = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                All Projects
            </Typography>
        </Box>
    )
};

export default AllProjects;