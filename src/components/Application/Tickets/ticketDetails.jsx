import React, { useEffect } from 'react';
import { Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Grid, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTicketDetails, moveTicketToArchive, deleteTicketFromArchive, restoreTicketFromArchive } from '../../../services/ticket/ticketDetailsSlice';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getTicketDetails: { loading }, ticket, ticket: { ticketHistory } } = useSelector(state => state.ticketDetails);

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


    return (
        loading ? <CircularProgress color="inherit" /> :
        <>
            <Typography paragraph>
                Ticket Details
            </Typography>

            <Paper sx={{ p: 3 }} elevation={3}>
                <Typography>Ticket ID: {ticket._id}</Typography>
                <Typography>Created By: {ticket.name}</Typography>
                <Typography>Created At: {ticket.createdAt}</Typography>

                <Accordion defaultExpanded={true} elevation={3} >
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Grid container justifyContent="space-between">
                            <Typography fontWeight={700}>Change #3</Typography>
                            <Typography fontWeight={700} sx={{ pr: "50px" }}>Date Updated: {ticket.updatedAt}</Typography>
                        </Grid>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Title: {ticket.title}</Typography>
                        <Typography>Description: {ticket.description}</Typography>
                        <Typography>Priority: {ticket.priority}</Typography>
                        <Typography>Status: {ticket.status}</Typography>
                        <Grid container>
                            { isArchived ? (
                                <Button variant="outlined" onClick={handleRecoverTicket}>Recover</Button>
                            ) : (
                                <Button variant="outlined" onClick={() => navigate(`/editTicket/${id}`)}>Edit</Button>
                            )}
                            <Button variant="outlined" onClick={handleDeleteTicket}>Delete</Button>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion >
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
        </>
    )
};


export default TicketDetails;
