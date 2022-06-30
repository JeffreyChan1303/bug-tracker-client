import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Grid, Button, CircularProgress, Box, TextField, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTicketDetails, moveTicketToArchive, deleteTicketFromArchive, restoreTicketFromArchive, addTicketComment } from '../../../services/ticket/ticketDetailsSlice';

const BoldedTableCell = styled(TableCell) (({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell) (({theme}) => ({
    padding: "5px",
}));

const getDateFromISODate = (ISODate) => {
    const date = new Date(ISODate);
    const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    return string
}

const TicketDetails = () => {
    const { id } = useParams();
    const [search, setSearch] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getTicketDetails: { loading }, ticket, ticket: { ticketHistory } } = useSelector(state => state.ticketDetails);
    console.log(ticket)

    useEffect(() => {
        dispatch(getTicketDetails(id))
    }, [])
    
    const isArchived = ticket.status === 'Archived';

    const handleDeleteTicket = () => {
        if (isArchived) {
            dispatch(deleteTicketFromArchive(id));
            navigate("/ticketArchive")
        } else {
            dispatch(moveTicketToArchive(id))
            navigate("/allTickets")
        }
    }

    const handleRecoverTicket = () => {
        dispatch(restoreTicketFromArchive(id));
        navigate("/allTickets");
    }

    const handleSaveComment = () => {
        dispatch(addTicketComment(id));
    }

    return (
        loading ? <CircularProgress color="inherit" /> :
        <>
            <Typography paragraph>
                Ticket Details
            </Typography>

            <Grid container spacing={2} >
                <Grid item xs={12} lg={6} >
                    <Grid container >
                        <Grid item xs={12} >
                            <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
                                <Grid container>
                                    <Grid item xs={5} >
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Title</Typography>
                                            <Typography paddingLeft={1} variant="body1" >{ticket.title}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Developer</Typography>
                                            <Typography paddingLeft={1} variant="body1">{ticket.developer}asdsfa</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Project</Typography>
                                            <Typography paddingLeft={1} variant="body1">{ticket.project?.title}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Ticket Status</Typography>
                                            <Typography paddingLeft={1} variant="body1">{ticket.status}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Created</Typography>
                                            <Typography paddingLeft={1} variant="body1">{getDateFromISODate(ticket.createdAt)}</Typography>
                                        </Box>    
                                    </Grid>

                                    <Grid item xs={7} >
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Description</Typography>
                                            <Typography paddingLeft={1} variant="body1">{ticket.description}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Created By</Typography>
                                            <Typography paddingLeft={1} variant="body1">{ticket.name}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Ticket Priority</Typography>
                                            <Typography paddingLeft={1} variant="body1">{ticket.priority}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Ticket Type</Typography>
                                            <Typography paddingLeft={1} variant="body1">{ticket.type}asdf</Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography fontWeight={600} variant="body2">Updated</Typography>
                                            <Typography paddingLeft={1} variant="body1">{getDateFromISODate(ticket.updatedAt)}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid container>
                                        { isArchived ? (
                                            <Button variant="outlined" onClick={handleRecoverTicket}>Recover</Button>
                                        ) : (
                                            <Button variant="outlined" onClick={() => navigate(`/editTicket/${id}`)}>Edit</Button>
                                        )}
                                        <Button variant="outlined" onClick={handleDeleteTicket}>Delete</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>


                        <Grid item xs={12} >
                            <Paper elevation={3} >
                                <Accordion elevation={0} disableGutters>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Grid container justifyContent="space-between">
                                            <Typography fontWeight={700} >Ticket History</Typography>
                                            <Typography fontWeight={700} sx={{ pr: "50px" }}>Number of Entries: {ticketHistory?.length}</Typography>
                                        </Grid>
                                    </AccordionSummary>

                                    {ticketHistory?.map((element, index) => (
                                        <AccordionDetails key={index}>
                                            <Grid container justifyContent="space-between">
                                                <Typography fontWeight={700} >Title: {element.title}</Typography>
                                                <Typography fontWeight={700} >Updated At: {element.updatedAt}</Typography>
                                            </Grid>
                                            <Typography>Description: {element.description}</Typography>
                                            <Typography>Priority: {element.priority}</Typography>
                                            <Typography>Status: {element.status}</Typography>
                                        </AccordionDetails>
                                    ))} 
                                </Accordion>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3 }} elevation={3} >
                        <Box sx={{  overflowX: 'scroll' }} >

                            <Typography variant="h6" fontWeight={700}>Ticket Comments</Typography>
                            <Box sx={{ display: "flex", justifyContent: "right" }}>
                                <Typography align="right" variant="body1"> Search:&nbsp; </Typography>
                                <TextField 
                                    size="small" 
                                    variant="standard"
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Box>
                            <Table sx={{ }} aria-label="simple table" size="small" >
                                <TableHead>
                                    <TableRow >
                                        <BoldedTableCell>User</BoldedTableCell>
                                        <BoldedTableCell align="left">Message</BoldedTableCell>
                                        <BoldedTableCell align="left">Created</BoldedTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {ticket.comments?.map((comment, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <ContentTableCell component="th" scope="row">
                                            {comment.name}
                                        </ContentTableCell>
                                        <ContentTableCell align="left">
                                            {comment.message}
                                        </ContentTableCell>
                                        <ContentTableCell align="left">
                                            {comment.createdAt}
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

                    <Paper elevation={3} sx={{ p: 2, mt: 2 }} >
                        <Typography fontWeight={700} variant="body1" align="center" marginBottom={1}>Add a comment?</Typography>
                        <Grid container justifyContent="space-evenly" >
                            <Grid item xs={8}>
                                <TextField
                                    size="small" 
                                    variant="outlined"
                                    multiline

                                    fullWidth
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Grid>
                            <Button
                                variant="outlined"
                                onClick={handleSaveComment}
                            >
                                Save Comment
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        </>
    )
};


export default TicketDetails;
