import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Button, CircularProgress, Divider, Box, TextField, Table, TableHead, TableRow, TableBody, TableCell, Chip, Tooltip, IconButton, Pagination, PaginationItem } from '@mui/material';
import { styled } from '@mui/system';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProjectTickets from './projectTickets';

import { getProjectDetails, moveProjectToArchive, searchProjectUsers, searchProjectTickets } from '../../../services/project/projectDetailsSlice';


const BoldedTableCell = styled(TableCell) (({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell) (({theme}) => ({
    padding: "5px",
}));

const getDateFromISODate = (ISODate) => {
    const date = new Date(ISODate);
    const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    return string
}


const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [assignedUsers, setAssignedUsers] = useState({
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 5,
    });

    const { getProjectDetails: { loading }, project, project: { searchedUsers: users } } = useSelector(state => state.projectDetails);

    useEffect(() => {
        dispatch(getProjectDetails(id))
    }, [])

    // search for project Users
    useEffect(() => {
        dispatch(searchProjectUsers({
            searchQuery: assignedUsers.searchQuery,
            currentPage: assignedUsers.currentPage,
            itemsPerPage: assignedUsers.itemsPerPage,
        }));
    }, [assignedUsers, project.users])

      
    const handleDeleteProject = () => {
        dispatch(moveProjectToArchive(id))
        navigate("/allProjects")
    }

    const handleAssignedUsersPageChange = (page) => {
        setAssignedUsers({ ...assignedUsers, currentPage: page });
    }




    return (
        loading ? <CircularProgress color="inherit" /> :
        <>
            <Typography paragraph>
                Project Details
            </Typography>

            <Paper sx={{ p: 3 }} elevation={1}>

                <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
                    <Grid container >
                        <Grid item xs={5} >
                            <Typography><strong>Project ID: </strong>{project._id}</Typography>
                            <Typography><strong>Created By: </strong>{project.name}</Typography>
                            <Typography><strong>Created At: </strong>{getDateFromISODate(project.createdAt)}</Typography>
                        </Grid>
                        <Grid item xs={7} >
                            <Typography variant="body1">
                                <strong>Title:</strong> {project.title}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Description:</strong> {project.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>



                <Grid container spacing={2} >
                    <Grid item xs={12} lg={5} >
                        <Paper sx={{ p: 3 }} elevation={3} >
                            <Box sx={{  overflowX: 'scroll' }} >
                                <Grid container justifyContent='space-between' >
                                    <Typography variant="h6" fontWeight={700}> Project Users </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "right" }}>
                                        <Typography align="right" variant="body1"> Search:&nbsp; </Typography>
                                        <TextField 
                                            size="small" 
                                            variant="standard"
                                            name="search"
                                            value={assignedUsers.searchQuery}
                                            onChange={(e) => setAssignedUsers({ ...assignedUsers, searchQuery: e.target.value })}
                                        />
                                    </Box>
                                </Grid>
                                <Table sx={{ }} aria-label="simple table" size="small" >
                                    <TableHead>
                                        <TableRow >
                                            <BoldedTableCell>User Name</BoldedTableCell>
                                            <BoldedTableCell align="left">Email</BoldedTableCell>
                                            <BoldedTableCell align="left">Role</BoldedTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {users &&
                                    users.map((user, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <ContentTableCell component="th" scope="row">
                                                {user.name}
                                            </ContentTableCell>
                                            <ContentTableCell align="left">
                                                {user.email}
                                            </ContentTableCell>
                                            <ContentTableCell align="left">
                                                {user.role}
                                            </ContentTableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>

                            </Box>

                            <Pagination
                                sx={{ ul: {justifyContent: "space-around" }, mt: "20px" }}
                                count={project.assignedUsersNumberOfPages}
                                page={assignedUsers.currentPage}
                                variant="outlined"
                                color="primary"
                                renderItem={(item) => (
                                    <PaginationItem
                                        { ...item }
                                        component={Button}
                                        onClick={() => handleAssignedUsersPageChange(item.page)}
                                    />
                                )}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={7}>
                        <ProjectTickets />
                    </Grid>
                </Grid>

                <Grid container sx={{ mt: "20px" }}>
                    <Button variant="outlined" onClick={() => navigate(`/editProject/${id}`)}>Edit</Button>
                    <Button variant="outlined" onClick={handleDeleteProject}>Delete</Button>
                    <Button variant="outlined" onClick={() => navigate(`/projectDetails/manageUserRoles/${id}`)}>Manage User Roles</Button>
                </Grid>

            </Paper>
        </>
    )
};


export default ProjectDetails;
