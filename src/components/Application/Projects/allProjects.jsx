import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllProjectsBySearch } from '../../../services/project/allProjectsSlice';
import CustomPagination from '../pagination';
import ProjectTable from './projectTable';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllProjects = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page');
  const [search, setSearch] = useState('');
  const { loading, projects, currentPage, numberOfPages } = useSelector(
    (state) => state.allProjects
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectsBySearch({ search, page }));
  }, [page]);

  const searchAllProjects = () => {
    if (search.trim()) {
      dispatch(getAllProjectsBySearch({ search, page: 1 }));
      navigate(`/allProjects?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/allProjects');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchAllProjects();
    }
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Typography variant="h5" fontWeight={700}>
          All Projects
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Typography align="right" variant="body1">
            Search:&nbsp;
          </Typography>
          <TextField
            size="small"
            variant="standard"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </Box>

        <ProjectTable projects={projects} projectDetails editProject />
      </Box>

      <CustomPagination
        path={`/allProjects${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default AllProjects;
