import React, { useEffect } from 'react';
import { Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Grid, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getProjectDetails, moveProjectToArchive } from '../../../services/project/projectDetailsSlice';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getProjectDetails: { loading }, project } = useSelector(state => state.projectDetails);

    useEffect(() => {
        dispatch(getProjectDetails(id))
    }, [])
      
    const handleDeleteProject = () => {
        dispatch(moveProjectToArchive(id))
        navigate("/allProjects")
    }


    return (
        loading ? <CircularProgress color="inherit" /> :
        <>
            <Typography paragraph>
                Project Details
            </Typography>

            <Paper sx={{ p: 3 }} elevation={3}>
                <Typography>Project ID: {project._id}</Typography>
                <Typography>Created By: {project.name}</Typography>
                <Typography>Created At: {project.createdAt}</Typography>

            <Accordion defaultExpanded={true} elevation={3} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Grid container justifyContent="space-between">
                        <Typography fontWeight={700}>Change #3</Typography>
                        <Typography fontWeight={700} sx={{ pr: "50px" }}>Date Updated: {project.updatedAt}</Typography>
                    </Grid>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Title: {project.title}</Typography>
                    <Typography>Description: {project.description}</Typography>
                    <Typography>Priority: {project.priority}</Typography>
                    <Typography>Status: {project.status}</Typography>
                    <Grid container>
                        <Button variant="outlined" onClick={() => navigate(`/editProject/${id}`)}>Edit</Button>
                        <Button variant="outlined" onClick={handleDeleteProject}>Delete</Button>
                        <Button variant="outlined" onClick={() => navigate(`/projectDetails/manageUserRoles/${id}`)}>Manage User Roles</Button>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            </Paper>
        </>
    )
};


export default ProjectDetails;
