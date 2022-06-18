import React from 'react';
import { Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Grid, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetTicketDetailsQuery } from '../../../services/ticket/ticketApi';
import { deleteTicket } from '../../../services/ticket/deleteTicketSlice';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isFetching } = useGetTicketDetailsQuery(id);
    console.log(data);

    const dispatch = useDispatch();

      
    const handleDeleteTicket = () => {
        // deleteTicket(id);
        // if (responseInfo.isError) {
        //     alert("Ticket has failed to delete")
        // }

        dispatch(deleteTicket(id))
        navigate("/allTickets")
    }


    return (
        <>
            <Typography paragraph>
                Ticket Details
            </Typography>

            <Paper sx={{ p: 3 }} elevation={3}>
                <Typography>Ticket ID: {id}</Typography>
                <Typography>Created By: {data?.creator}</Typography>
                <Typography>Created At: {data?.createdAt}</Typography>

            <Accordion defaultExpanded={true} elevation={3} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Grid container justifyContent="space-between">
                        <Typography fontWeight={700}>Change #3</Typography>
                        <Typography fontWeight={700} sx={{ pr: "50px" }}>Date Updated: {data?.updatedAt}</Typography>
                    </Grid>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Title: {data?.title}</Typography>
                    <Typography>Description: {data?.description}</Typography>
                    <Typography>Priority: {data?.priority}</Typography>
                    <Typography>Status: {data?.status}</Typography>
                    <Grid container>
                        <Button variant="outlined">Edit</Button>
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
