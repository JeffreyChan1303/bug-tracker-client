import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { handleAlerts } from '../../../services/crudFeedbackSlice';
import { createProject } from '../../../services/project/addProjectSlice';

const initialProjectData = {
    creator: '', // this state will be taken from the redux store where Login information is stored
    title: '',
    description: '',
    priority: 'High',
    status: 'New',
};


const AddProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState(initialProjectData);
    const user = JSON.parse(localStorage.getItem('profile'))

    const handlePriorityChange = (event) => {
        setProjectData({ ...projectData, priority: event.target.value });
    };
    const handleStatusChange = (event) => {
        setProjectData({ ...projectData, status: event.target.value });
    };



    const handleSubmit = (event) => {
        event.preventDefault(); // this stops the page from it's default refrash setting when clicking a button on the react form.

        if (projectData.title === '') { 
            dispatch(handleAlerts({ severity: "warning", message: "Invalid title" }));
        }
        if (projectData.description === '') {
            dispatch(handleAlerts({ severity: "warning", message: "Invalid description" }));
        }

        if (projectData.title !== '' && projectData.description !== '') {
            dispatch(createProject({ ...projectData, name: user?.userObject?.name }));
            navigate("/allProjects");
        }
    };

    const handleClear = () => {
        setProjectData(initialProjectData);
    }

    return (
        <>
            <Typography paragraph>
                Add Project
            </Typography>
            
            <Paper sx={{ p: 3, maxWidth: { md: "700px" }}} elevation={3} >
                <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{  }}>
                    <Typography variant="body1" fontWeight={700}>Project Title</Typography>
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        size="small"
                        sx={{ mb: 2 }}
                        value={projectData.title}
                        onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                    />

                    <Typography variant="body1" fontWeight={700}>Project Description</Typography>
                    <TextField 
                        name="description" 
                        variant="outlined" 
                        fullWidth
                        multiline
                        size="small"
                        sx={{ mb: 2 }}
                        rows={4}
                        value={projectData.description}
                        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    />

                    <Typography variant="body1" fontWeight={700}>Project Priority</Typography>
                    <Select
                        value={projectData.priority}
                        onChange={handlePriorityChange}
                        sx={{ mb: 2 }}
                        fullWidth
                    >
                        <MenuItem value={"Low"}>Low Priority</MenuItem>
                        <MenuItem value={"Medium"}>Medium Priority</MenuItem>
                        <MenuItem value={"High"}>High Priority</MenuItem>
                    </Select>

                    <Typography variant="body1" fontWeight={700}>Project Status</Typography>
                    <Select
                        value={projectData.status}
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

export default AddProject;