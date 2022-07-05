import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Button, CircularProgress, Divider, Box, TextField, Table, TableHead, TableRow, TableBody, TableCell, Chip, Tooltip, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { getProjectDetails, moveProjectToArchive, searchProjectUsers, searchProjectTickets } from '../../../services/project/projectDetailsSlice';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const BoldedTableCell = styled(TableCell) (({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell) (({theme}) => ({
    padding: "5px",
}));

const getDateFromISODate = (ISODate) => {
    const date = new Date(ISODate);
    const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}:${date.getHours()}:${date.getMinutes()}`;
    return string
}


const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [usersSearch, setUsersSearch] = useState('');
    const [ticketsSearch, setTicketsSearch] = useState('');

    const { getProjectDetails: { loading }, project: { searchedUsers: users, tickets, ...project } } = useSelector(state => state.projectDetails);

    useEffect(() => {
        dispatch(getProjectDetails(id))
    }, [])

    useEffect(() => {
        dispatch(searchProjectUsers(usersSearch));
    }, [usersSearch])

    useEffect(() => {
        dispatch(searchProjectTickets(ticketsSearch));
    }, [ticketsSearch])
      
    const handleDeleteProject = () => {
        dispatch(moveProjectToArchive(id))
        navigate("/allProjects")
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
                            <Typography><strong>Created At: </strong>{Date(project.createdAt)}</Typography>
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

                                <Typography variant="h6" fontWeight={700}> Assigned Users </Typography>
                                <Box sx={{ display: "flex", justifyContent: "right" }}>
                                    <Typography align="right" variant="body1"> Search:&nbsp; </Typography>
                                    <TextField 
                                        size="small" 
                                        variant="standard"
                                        name="search"
                                        value={usersSearch}
                                        onChange={(e) => setUsersSearch(e.target.value)}
                                    />
                                </Box>
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
                                    Object.keys(users).map((userId, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <ContentTableCell component="th" scope="row">
                                                {users[userId].name}
                                            </ContentTableCell>
                                            <ContentTableCell align="left">
                                                {users[userId].email}
                                            </ContentTableCell>
                                            <ContentTableCell align="left">
                                                {users[userId].role}
                                            </ContentTableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>

                            </Box>

                            {/* <CustomPagination 
                                path={`/allProjects${search.trim()? `/search?searchQuery=${search}&` : `?`}`}
                                page={page}
                                currentPage={currentPage}
                                numberOfPages={numberOfPages}
                            /> */}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={7}>
                        <Paper sx={{ p: 3 }} elevation={3} >
                            <Box sx={{  overflowX: 'scroll' }} >

                                <Typography variant="h6" fontWeight={700}> Assigned Tickets </Typography>
                                <Box sx={{ display: "flex", justifyContent: "right" }}>
                                    <Typography align="right" variant="body1"> Search:&nbsp; </Typography>
                                    <TextField 
                                        size="small" 
                                        variant="standard"
                                        name="ticketsSearch"
                                        value={ticketsSearch}
                                        onChange={(e) => setTicketsSearch(e.target.value)}
                                    />
                                </Box>
                                <Table sx={{  }} aria-label="simple table" size="small" >
                                    <TableHead>
                                        <TableRow >
                                            <BoldedTableCell>Title</BoldedTableCell>
                                            <BoldedTableCell align="left">Submitted By</BoldedTableCell>
                                            <BoldedTableCell align="left">Developer</BoldedTableCell>
                                            <BoldedTableCell align="left">Status</BoldedTableCell>
                                            <BoldedTableCell align="left">Created At</BoldedTableCell>
                                            <BoldedTableCell align="center">Actions</BoldedTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {tickets.map((ticket, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <ContentTableCell >
                                                {ticket.title}
                                            </ContentTableCell>
                                            <ContentTableCell align="left">{ticket.name}</ContentTableCell>
                                            <ContentTableCell align="left">add Developer</ContentTableCell>
                                            <ContentTableCell align="left">
                                                <Chip label={ticket.status} variant="outlined" color="secondary" />
                                            </ContentTableCell>
                                            <ContentTableCell align="left">
                                                {getDateFromISODate(ticket.createdAt)}
                                            </ContentTableCell>
                                            <ContentTableCell sx={{ display: "flex", justifyContent: "center" }}>
                                                <Tooltip title="View">
                                                    <IconButton onClick={() => navigate(`/ticketDetails/${ticket._id}`)}>
                                                        <VisibilityOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </ContentTableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>

                            </Box>

                            {/* <CustomPagination 
                                path={`/allProjects${search.trim()? `/search?searchQuery=${search}&` : `?`}`}
                                page={page}
                                currentPage={currentPage}
                                numberOfPages={numberOfPages}
                            /> */}
                        </Paper>
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
