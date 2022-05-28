import React from 'react';
import { Box, Typography, Toolbar, Paper, Pagination, Table, TableHead, TableRow, TableCell, TableBody, Backdrop, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useGetAllProjectsQuery } from '../../../services/project/projectApi';


const AllProjects = ({ drawerWidth }) => {
    const { data, isFetching } = useGetAllProjectsQuery();
    console.log(data, isFetching);



    if(isFetching) {
        return (
            <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
                <Toolbar />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        )
    }
    
    const handlePageChange = (event) => {

    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                All Projects
            </Typography>

            <Paper sx={{ p: 3 }} elevation={3}>
            {/* <TableContainer component={Paper}> */}
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow >
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Submitted By</TableCell>
                        <TableCell align="right">Priority</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data && data.map((project) => (
                        <TableRow
                        key={project.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {project.title}
                        </TableCell>
                        <TableCell align="right">{project.creator}</TableCell>
                        <TableCell align="right">{project.priority}</TableCell>
                        <TableCell align="right">{project.status}</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                            <Tooltip title="View">
                                <IconButton href="/myProjects">
                                    <VisibilityOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {/* </TableContainer> */}


                <Pagination count={10} variant="outlined" color="primary" onChange={handlePageChange}/>
            </Paper>
        </Box>
    )
};

export default AllProjects;