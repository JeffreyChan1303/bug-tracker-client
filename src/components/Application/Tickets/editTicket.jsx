import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Paper, Select, MenuItem, Backdrop, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetTicketDetailsQuery, useUpdateTicketMutation } from '../../../services/ticket/ticketApi';

const EditTicket = () => {
    const { id } = useParams()
    // QUERY A TICKET AND GET THE INFORMATION AND PUT IT INTO THE STATE for people to change

    // get ticket information
    // update ticket information
    const [updateTicket, responseInfo] = useUpdateTicketMutation();

    const [postData, setPostData] = useState({
        creator: '', // this state will be taken from the redux store where Login information is stored
        title: '',
        description: '',
        priority: 'High',
        status: 'New',
        _id: id,
    });

    const { data, isFetching } = useGetTicketDetailsQuery(id);
    

    if(isFetching) {
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

        updateTicket(postData);
        console.log(responseInfo);
        responseInfo.isError && alert("failed creating ticket");
    };

    const handleUsePrevTicketValues = () => {
        setPostData({
            ...postData,
            title: data? data.title : '',
            description: data? data.description : '',
            priority: data? data.priority : 'High',
            status: data? data.status : 'New',
        })
    }

    return (
        <>
            <Typography paragraph>
                Editing Ticket, { id }
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
                    

                    <Button sx={{ mr: 1 }} variant="contained" color="primary" size="small" type="submit" >
                        Save
                    </Button>
                    <Button sx={{}} variant="outlined" color="secondary" size="small" type="cancel" onClick={() => ({})}>
                        Cancel
                    </Button>

                </form>
            </Paper>
        </>
    )
};

export default EditTicket;