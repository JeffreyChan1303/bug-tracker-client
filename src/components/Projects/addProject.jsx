import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const AddProject = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Add Project
            </Typography>
        </Box>
    )
};

export default AddProject;