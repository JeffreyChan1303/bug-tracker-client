import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const ProjectArchive = ({ drawerWidth }) => {

    return (
        <Box sx={{ p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Project Archive
            </Typography>
        </Box>
    )
};

export default ProjectArchive;