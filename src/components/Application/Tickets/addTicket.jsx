import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Select, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getMyProjects } from '../../../services/project/myProjectsSlice';
import { createTicket } from '../../../services/ticket/addTicketSlice';
import { handleAlerts } from '../../../services/alertsSlice';

const initialTicketData = {
    creator: '', // this state will be taken from the redux store where Login information is stored
    title: '',
    description: '',
    priority: 'High',
    status: 'New',
    project: {
        _id: null,
        title: '',
    }
};


const AddTicket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ticketData, setTicketData] = useState(initialTicketData);
    const user = JSON.parse(localStorage.getItem('profile'))

    const { loading, projects } = useSelector(state => state.myProjects);


    useEffect(() => {
        // THIS IS IMPORTANT. WE NEED TO MAKE A GET ALL OF MY PROJECT FUNCTIONS WITHOUT THE PAGE. this is needed for this part of the project
        // we may need to make a new function or competely refactor the old one!!!
        dispatch(getMyProjects(1));
    }, [])



    const handlePriorityChange = (event) => {
        setTicketData({ ...ticketData, priority: event.target.value });
    };
    const handleStatusChange = (event) => {
        setTicketData({ ...ticketData, status: event.target.value });
    };
    const handleProjectChange = (id, title) => {
        setTicketData({...ticketData, project: { _id: id, title: title } });
    }



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
        loading ? <CircularProgress color="inherit" /> :
        <>
            <Typography variant="h5">
                Add Ticket
            </Typography>
            
            <Paper sx={{ p: 3, maxWidth: { md: "700px" }}} elevation={3} >
                <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{  }}>

                    <Typography variant="body1" fontWeight={700}>Project</Typography>
                    <Select
                        value={ticketData.project.title}
                        sx={{ mb: 2 }}
                        fullWidth
                        size="small"
                    >
                        {projects && projects.map((project, index) => (
                            <MenuItem 
                                key={index} 
                                value={project.title} 
                                onClick={() => handleProjectChange(project._id, project.title)}
                            >
                                {project.title}
                            </MenuItem>
                        ))}
                    </Select>

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