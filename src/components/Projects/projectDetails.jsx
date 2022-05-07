import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const ProjectDetails = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Project Details
            </Typography>
        </Box>
    )
};

export default ProjectDetails;