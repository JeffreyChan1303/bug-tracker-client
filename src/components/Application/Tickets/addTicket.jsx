import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { handleAlerts } from '../../../services/crudFeedbackSlice';
import { createTicket } from '../../../services/ticket/addTicketSlice';

const initialTicketData = {
    creator: '', // this state will be taken from the redux store where Login information is stored
    title: '',
    description: '',
    priority: 'High',
    status: 'New',
};


const AddTicket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ticketData, setTicketData] = useState(initialTicketData);
    const user = JSON.parse(localStorage.getItem('profile'))

    const handlePriorityChange = (event) => {
        setTicketData({ ...ticketData, priority: event.target.value });
    };
    const handleStatusChange = (event) => {
        setTicketData({ ...ticketData, status: event.target.value });
    };



    const handleSubmit = (event) => {
        event.preventDefault(); // this stops the page from it's default refrash setting when clicking a button on the react form.

        if (ticketData.title === '') { 
            dispatch(handleAlerts({ severity: "warning", message: "Invalid title" }));
        }
        if (ticketData.description === '') {
            dispatch(handleAlerts({ severity: "warning", message: "Invalid description" }));
        }

        if (ticketData.title !== '' && ticketData.description !== '') {
            dispatch(createTicket({ ...ticketData, name: user?.userObject?.name }));
            navigate("/allTickets");
        }
    };

    const handleClear = () => {
        setTicketData(initialTicketData);
    }

    return (
        <>
            <Typography paragraph>
                Add Ticket
            </Typography>
            
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
                </form>

                <Button sx={{ mr: 1 }} variant="contained" color="primary" size="small" onClick={handleSubmit} >
                        Save
                    </Button>
                    <Button sx={{}} variant="outlined" color="secondary" size="small" onClick={handleClear}>
                        Clear
                    </Button>
            </Paper>
        </>
    )
};

export default AddTicket;