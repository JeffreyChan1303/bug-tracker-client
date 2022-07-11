import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProjectTickets from './projectTickets';
import ProjectUsers from './projectUsers';

import { getProjectDetails, moveProjectToArchive, searchProjectUsers, searchProjectTickets } from '../../../services/project/projectDetailsSlice';



const getDateFromISODate = (ISODate) => {
    const date = new Date(ISODate);
    const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    return string
}


const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getProjectDetails: { loading }, project } = useSelector(state => state.projectDetails);

    useEffect(() => {
        dispatch(getProjectDetails(projectId))
    }, [])

      
    const handleDeleteProject = () => {
        dispatch(moveProjectToArchive(projectId))
        navigate("/allProjects")
    }



    return (
        loading ? <CircularProgress color="inherit" /> :
        <>
            <Typography paragraph>
                Project Details
            </Typography>

            <Paper sx={{ p: 3 }} elevation={1}>

                <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
                    <Grid container >
                        <Grid item xs={5} >
                            <Typography><strong>Project ID: </strong>{project._id}</Typography>
                            <Typography><strong>Created By: </strong>{project.name}</Typography>
                            <Typography><strong>Created At: </strong>{getDateFromISODate(project.createdAt)}</Typography>
                        </Grid>
                        <Grid item xs={7} >
                            <Typography variant="body1">
                                <strong>Title:</strong> {project.title}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Description:</strong> {project.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>



                <Grid container spacing={2} >
                    <Grid item xs={12} lg={5} >
                        <ProjectUsers projectId={projectId} />
                    </Grid>

                    <Grid item xs={12} lg={7}>
                        <ProjectTickets projectId={projectId} />
                    </Grid>
                </Grid>

                <Grid container sx={{ mt: "20px" }}>
                    <Button variant="outlined" onClick={() => navigate(`/editProject/${projectId}`)}>Edit</Button>
                    <Button variant="outlined" onClick={handleDeleteProject}>Delete</Button>
                    <Button variant="outlined" onClick={() => navigate(`/projectDetails/manageUserRoles/${projectId}`)}>Manage User Roles</Button>
                    <Button variant="outlined" onClick={() => navigate(`/projectDetails/assignTickets/${projectId}`)}>Assign Tickets</Button>
                </Grid>

            </Paper>
        </>
    )
};


export default ProjectDetails;
