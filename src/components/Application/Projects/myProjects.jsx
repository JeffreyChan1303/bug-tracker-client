import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, IconButton, Tooltip, TextField, Chip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { getMyProjects, getMyProjectsBySearch } from '../../../services/project/myProjectsSlice';
import store from '../../../app/store';
import CustomPagination from '../pagination';

const BoldedTableCell = styled(TableCell)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell)(({theme}) => ({
    padding: "5px",
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const MyProjects = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page');
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    // useSelector may be useful when we implement the dashboard which requires multiple api calls
    const { loading, projects, currentPage, numberOfPages } = useSelector((state) => state.myProjects);

    const dispatch = useDispatch();

    const unsubscribe = store.subscribe(() => {
        // console.log('updated state: ', store.getState().allProjects)
    })


    useEffect(() => {
        // this fetches data every time the page is changed
        if (search.trim()) {
            dispatch(getMyProjectsBySearch({ search, page }));
        } else {
            dispatch(getMyProjects(page));
            navigate('/myProjects')
        }
    //    dispatch(getMyProjects(page));
    }, [page])

    const searchMyProjects = () => {
        if (search.trim()) {
            //dispatch an action
            
            dispatch(getMyProjectsBySearch({ search, page: 1 }))

            navigate(`/myProjects/search?searchQuery=${search || 'none'}&page=1`);
        } else {
            navigate('/myProjects')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // search for post... probably a dispatch or something here
            searchMyProjects();
        }
    }

    return (
        loading ? <CircularProgress color="inherit" /> : (
        <>
            <Paper sx={{ p: 3 }} elevation={3} >
                <Box sx={{  overflowX: 'scroll' }} >
                    
                    <Typography variant="h5" fontWeight={700}> My Projects </Typography>
                    <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Typography align="right" variant="body1"> Search:&nbsp; </Typography>
                        <TextField 
                            size="small" 
                            variant="standard"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </Box>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small" >
                        <TableHead>
                            <TableRow >
                                <BoldedTableCell>Title</BoldedTableCell>
                                <BoldedTableCell sx={{ fontWeight: 600 }} align="right">Submitted By</BoldedTableCell>
                                <BoldedTableCell align="right">Developer</BoldedTableCell>
                                <BoldedTableCell align="right">Status</BoldedTableCell>
                                <BoldedTableCell align="right">Priority</BoldedTableCell>
                                <BoldedTableCell align="right">Last Updated</BoldedTableCell>
                                <BoldedTableCell align="center">Actions</BoldedTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {projects && projects.map((project, i) => (
                            <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <ContentTableCell component="th" scope="row">
                                    {project.title}
                                </ContentTableCell>
                                <ContentTableCell align="right">{project.name}</ContentTableCell>
                                <ContentTableCell align="right">add project developer</ContentTableCell>
                                <ContentTableCell align="right">
                                    <Chip label={project.status} variant="outlined" color="secondary" />
                                </ContentTableCell>
                                <ContentTableCell align="right">
                                    <Chip label={project.priority} variant="outlined" color="secondary" />
                                </ContentTableCell>
                                <ContentTableCell align="right">add last updated</ContentTableCell>
                                <ContentTableCell sx={{ display: "flex", justifyContent: "center" }}>
                                    <Tooltip title="View">
                                        <IconButton onClick={() => navigate(`/projectDetails/${project._id}`)}>
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => navigate(`/editProject/${project._id}`)}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ContentTableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>


                <CustomPagination 
                    path={`/myProjects${search.trim()? `/search?searchQuery=${search}&` : `?`}`}
                    page={page}
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                />
            </Paper>
        </>
        )
    )
};

export default MyProjects;