import React, { useState } from 'react';
import { Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { handleAlerts } from '../../../services/alertsSlice';
import { createProject } from '../../../services/project/addProjectSlice';

const initialProjectData = {
  creator: '',
  title: '',
  description: '',
};

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(initialProjectData);
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleSubmit = async (event) => {
    // this stops the page from it's default refrash setting when clicking a button on the react form.
    event.preventDefault();

    if (projectData.title === '') {
      dispatch(handleAlerts({ severity: 'warning', message: 'Invalid title' }));
    }
    if (projectData.description === '') {
      dispatch(handleAlerts({ severity: 'warning', message: 'Invalid description' }));
    }

    if (projectData.title !== '' && projectData.description !== '') {
      await dispatch(createProject({ ...projectData, name: user?.userObject?.name }));
      navigate('/myProjects');
    }
  };

  const handleClear = () => {
    setProjectData(initialProjectData);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: { md: '700px' } }} elevation={3}>
      <Typography variant="h5" fontWeight={700}>
        Add Project
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{}}>
        <Typography variant="body1" fontWeight={700}>
          Project Title
        </Typography>
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

        <Typography variant="body1" fontWeight={700}>
          Project Description
        </Typography>
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
      </form>

      <Button
        sx={{ mr: 1 }}
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubmit}
      >
        Save
      </Button>
      <Button sx={{}} variant="outlined" color="secondary" size="small" onClick={handleClear}>
        Clear
      </Button>
    </Paper>
  );
};

export default AddProject;
