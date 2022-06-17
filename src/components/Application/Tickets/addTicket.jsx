import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { crudFeedbackSuccess, crudFeedbackFailure } from '../../../services/crudFeedbackSlice';

import CrudAlert from '../CrudFeedback/crudAlert';
import { useCreateTicketMutation } from '../../../services/ticket/ticketApi';

const initialPostData = {
    creator: '', // this state will be taken from the redux store where Login information is stored
    title: '',
    description: '',
    priority: 'High',
    status: 'New',
};


const AddTicket = () => {
    const dispatch = useDispatch();
    const crudFeedback = useSelector((state) => state.crudFeedback);

    const navigate = useNavigate();
    const [createTicket, responseInfo] = useCreateTicketMutation();

    const [postData, setPostData] = useState(initialPostData);
    const user = JSON.parse(localStorage.getItem('profile'))

    const handlePriorityChange = (event) => {
        setPostData({ ...postData, priority: event.target.value });
    };
    const handleStatusChange = (event) => {
        setPostData({ ...postData, status: event.target.value });
    };



    const handleSubmit = (event) => {
        event.preventDefault(); // this stops the page from it's default refrash setting when clicking a button on the react form.

        if (postData.title === '') { // this should be changed to a shake and notification using mui error to indicate one of the text fields are wrong
            alert("invalid title"); 
        }
        if (postData.description === '') {
            alert("invalid description");
        }

        createTicket({ ...postData, name: user?.userObject?.name }); 
        responseInfo.isError && alert("failed creating ticket");
        
        navigate("/allTickets");

    };

    const handleClear = () => {
        setPostData(initialPostData);
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
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
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
                        value={postData.description}
                        onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                    />

                    <Typography variant="body1" fontWeight={700}>Ticket Priority</Typography>
                    <Select
                        value={postData.priority}
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
                        value={postData.status}
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

            <CrudAlert />
        </>
    )
};

export default AddTicket;