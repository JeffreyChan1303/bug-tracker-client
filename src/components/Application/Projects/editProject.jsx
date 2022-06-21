import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Paper, Select, MenuItem, Backdrop, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProjectDetails, updateProject } from '../../../services/project/projectDetailsSlice';

const initialProjectData = {
    creator: '',
    title: '',
    description: '',
    priority: 'High',
    status: 'New',
}

const EditProject = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { updateProject: { loading }, project} = useSelector(state => state.projectDetails);    
    const [projectData, setProjectData] = useState(initialProjectData);

    const handleUsePrevProjectValues = () => {
        setProjectData({
            ...projectData,
            title: project.title,
            description: project.description,
            status: project.status,
        })
    }

    useEffect(() => {
        dispatch(getProjectDetails(id));
    }, [])

    const handlePriorityChange = (event) => {
        setProjectData({ ...projectData, priority: event.target.value });
    };
    const handleStatusChange = (event) => {
        setProjectData({ ...projectData, status: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (projectData.title === '') { 
            alert("invalid title"); 
        }
        if (projectData.description === '') {
            alert("invalid description");
        }

        dispatch(updateProject({ ...projectData, _id: id }));
        navigate('/allProjects');
    };

    const handleClear = () => {
        setProjectData(initialProjectData);
    }

    return (
        loading ? <CircularProgress color="inherit" /> : (
        <>
            <Typography paragraph>
                Editing Project Id: { id }
            </Typography>
            <Button sx={{}} variant="outlined" color="secondary" size="small" type="cancel" onClick={handleUsePrevProjectValues}>
                    use default tick values
            </Button>
            
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
    )
};

export default EditProject;