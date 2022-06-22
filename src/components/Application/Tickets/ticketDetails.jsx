import React, { useEffect } from 'react';
import { Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Grid, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTicketDetails, moveTicketToArchive, deleteTicketFromArchive } from '../../../services/ticket/ticketDetailsSlice';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getTicketDetails: { loading }, ticket } = useSelector(state => state.ticketDetails);

    useEffect(() => {
        dispatch(getTicketDetails(id))
    }, [])
      
    const handleDeleteTicket = () => {
        if (ticket.status === 'Archived') {
            dispatch(deleteTicketFromArchive(id));
            navigate("/ticketArchive")
        } else {
            dispatch(moveTicketToArchive(id))
            navigate("/allTickets")
        }
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
                        <Button variant="outlined" onClick={() => navigate(`/editTicket/${id}`)}>Edit</Button>
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
                <Typography>DECIDE IF I WANT TO SAVE THE TICKET HISTORY WHEN IT IS CHANGED</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>

            </Paper>
        </>
    )
};


export default TicketDetails;
