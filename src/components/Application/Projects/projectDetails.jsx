/* eslint-disable */
import React, { useEffect } from 'react';
import { Typography, Paper, Grid, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProjectTickets from './projectTickets';
import ProjectUsers from './projectUsers';

import {
  getProjectDetails,
  moveProjectToArchive,
  deleteProjectFromArchive,
  restoreProjectFromArchive,
} from '../../../services/project/projectDetailsSlice';

import { getDateFromISODate, getTimeFromISODate } from '../../Utility/formatDate';
import { leaveProject } from '../../../services/project/projectUsersSlice';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getProjectDetails: { loading },
    project,
  } = useSelector((state) => state.projectDetails);
  const { authData } = useSelector((state) => state.user);
  const {
    projectUsers: { original: projectUsers },
  } = useSelector((state) => state.projectUsers);

  const isArchived = project?.status === 'Archived';

  useEffect(() => {
    dispatch(getProjectDetails(projectId));
  }, []);

  const handleDeleteProject = async () => {
    if (isArchived) {
      await dispatch(deleteProjectFromArchive(projectId));
      navigate('/projectArchive');
    } else {
      await dispatch(moveProjectToArchive(projectId));
      navigate('/myProjects');
    }
  };

  const handleRestoreProject = async (projectId) => {
    await dispatch(restoreProjectFromArchive(projectId));
    navigate('/myProjects');
  };

  const handleLeaveProject = async () => {
    await dispatch(leaveProject({ projectId }));
    navigate('/myProjects');
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <>
      <Paper sx={{ p: 3 }} elevation={1}>
        <Typography variant="h5" fontWeight={700} marginBottom={1}>
          Project Details
        </Typography>
        <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>
                <strong>Project ID: </strong>
                {project?._id}
              </Typography>
              <Typography>
                <strong>Created By: </strong>
                {project?.name}
              </Typography>
              <Typography>
                <strong>Created At: </strong>
                {getDateFromISODate(project?.createdAt)} {getTimeFromISODate(project?.createdAt)}
              </Typography>
              <Typography>
                <strong>Status: </strong>
                {project?.status}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">
                <strong>Title:</strong> {project?.title}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {project?.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <ProjectUsers />
          </Grid>

          <Grid item xs={12} lg={7}>
            <ProjectTickets />
          </Grid>
        </Grid>

        <Grid container sx={{ mt: '20px' }} gap={3}>
          {project?.status === 'Archived' ? (
            <Button variant="outlined" onClick={() => handleRestoreProject(project._id)}>
              Restore Project
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => navigate(`/editProject/${projectId}`)}
              disabled={projectUsers[authData?.userObject._id]?.role !== 'Admin'}
            >
              Edit
            </Button>
          )}
          <Button
            variant="outlined"
            disabled={
              project?.status === 'Archived' ||
              (projectUsers[authData?.userObject._id]?.role !== 'Admin' &&
                projectUsers[authData?.userObject._id]?.role !== 'Project Manager')
            }
            onClick={() => navigate(`/projectDetails/manageUserRoles/${projectId}`)}
          >
            Manage User Roles
          </Button>
          <Button
            variant="outlined"
            disabled={
              project?.status === 'Archived' ||
              (projectUsers[authData?.userObject._id]?.role !== 'Admin' &&
                projectUsers[authData?.userObject._id]?.role !== 'Project Manager')
            }
            onClick={() => navigate(`/projectDetails/assignTicket/${projectId}`)}
          >
            Assign Ticket
          </Button>
          <Button
            variant="outlined"
            disabled={projectUsers[authData?.userObject._id]?.role !== 'Admin'}
            onClick={handleDeleteProject}
          >
            Delete
          </Button>

          <Button variant="outlined" onClick={handleLeaveProject}>
            Leave Project
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default ProjectDetails;
