import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Paper, Select, MenuItem, Backdrop, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTicketDetails } from '../../../services/ticket/ticketDetailsSlice';
import { updateTicket } from '../../../services/ticket/editTicketSlice';

const initialTicketData = {
    creator: '',
    title: '',
    description: '',
    priority: 'High',
    status: 'New',
}

const EditTicket = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, ticket} = useSelector(state => state.ticketDetails);    
    const [ticketData, setTicketData] = useState(initialTicketData);
    // console.log(ticket)

    useEffect(() => {
        dispatch(getTicketDetails(id));
    }, [])

    if(loading) {
        return (
            <>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        )
    }
    


    const handlePriorityChange = (event) => {
        setTicketData({ ...ticketData, priority: event.target.value });
    };
    const handleStatusChange = (event) => {
        setTicketData({ ...ticketData, status: event.target.value });
    };


    const handleSubmit = (event) => {
        event.preventDefault(); // this stops the page from it's default refrash setting when clicking a button on the react form.

        if (ticketData.title === '') { // this should be changed to a shake and notification using mui error to indicate one of the text fields are wrong
            alert("invalid title"); 
        }
        if (ticketData.description === '') {
            alert("invalid description");
        }

        dispatch(updateTicket({ ...ticketData, _id: id }));
        navigate('/allTickets');
    };

    const handleClear = () => {
        setTicketData(initialTicketData);
    }

    const handleUsePrevTicketValues = () => {
        setTicketData({
            ...ticketData,
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
        })
    }

    return (
        <>
            <Typography paragraph>
                Editing Ticket Id: { id }
            </Typography>
            <Button sx={{}} variant="outlined" color="secondary" size="small" type="cancel" onClick={handleUsePrevTicketValues}>
                    use default tick values
            </Button>
            
            <Paper sx={{ p: 3, maxWidth: { md: "700px" }}} elevation={3} >
                <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{  }}>
                    <Typography variant="body1" fontWeight={700}>Ticket Title</Typography>
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        size="small"
                        sx={{ mb: 2 }}
                        value={ticketData.title}
                        onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
                    />

                    <Typography variant="body1" fontWeight={700}>Ticket Description</Typography>
                    <TextField 
                        name="description" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        size="small"
                        sx={{ mb: 2 }}
                        rows={4}
                        value={ticketData.description}
                        onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                    />

                    <Typography variant="body1" fontWeight={700}>Ticket Priority</Typography>
                    <Select
                        value={ticketData.priority}
                        onChange={handlePriorityChange}
                        sx={{ mb: 2 }}
                        fullWidth
                    >
                        <MenuItem value={"Low"}>Low Priority</MenuItem>
                        <MenuItem value={"Medium"}>Medium Priority</MenuItem>
                        <MenuItem value={"High"}>High Priority</MenuItem>
                    </Select>

                    <Typography variant="body1" fontWeight={700}>Ticket Status</Typography>
                    <Select
                        value={ticketData.status}
                        onChange={handleStatusChange}
                        sx={{ mb: 2 }}
                        fullWidth
                        size="small"
                    >
                        <MenuItem value={"Archived"}>Archived</MenuItem>
                        <MenuItem value={"Resolved"}>Resolved</MenuItem>
                        <MenuItem value={"Testing"}>Testing</MenuItem>
                        <MenuItem value={"Development"}>Development</MenuItem>
                        <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                        <MenuItem value={"New"}>New</MenuItem>

                    </Select>
                    

                    <Button sx={{ mr: 1 }} variant="contained" color="primary" size="small" onClick={handleSubmit} >
                        Save
                    </Button>
                    <Button sx={{}} variant="outlined" color="secondary" size="small" onClick={handleClear}>
                        Clear
                    </Button>

                </form>
            </Paper>
        </>
    )
};

export default EditTicket;