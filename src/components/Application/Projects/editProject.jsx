import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProjectDetails, updateProject } from '../../../services/project/projectDetailsSlice';

const initialProjectData = {
  creator: '',
  title: '',
  description: '',
};

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    updateProject: { loading },
    project,
  } = useSelector((state) => state.projectDetails);
  const [projectData, setProjectData] = useState(initialProjectData);

  const handleUsePrevProjectValues = () => {
    setProjectData({
      ...projectData,
      title: project.title,
      description: project.description,
    });
  };

  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (projectData.title === '') {
      alert('invalid title');
    }
    if (projectData.description === '') {
      alert('invalid description');
    }

    dispatch(updateProject({ ...projectData, _id: id }));
    navigate('/allProjects');
  };

  const handleClear = () => {
    setProjectData(initialProjectData);
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <>
      <Typography paragraph>Editing Project Id: {id}</Typography>
      <Button
        sx={{}}
        variant="outlined"
        color="secondary"
        size="small"
        type="cancel"
        onClick={handleUsePrevProjectValues}>
        use default tick values
      </Button>

      <Paper sx={{ p: 3, maxWidth: { md: '700px' } }} elevation={3}>
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

          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}>
            Save
          </Button>
          <Button sx={{}} variant="outlined" color="secondary" size="small" onClick={handleClear}>
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default EditProject;
