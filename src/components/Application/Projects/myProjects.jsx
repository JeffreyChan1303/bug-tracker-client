import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMyProjectsBySearch } from '../../../services/project/myProjectsSlice';
import CustomPagination from '../pagination';
import ProjectTable from './projectTable';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MyProjects = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page');
  const [search, setSearch] = useState('');
  const { loading, projects, currentPage, numberOfPages } = useSelector(
    (state) => state.myProjects
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // gets data every time page is changed
    dispatch(getMyProjectsBySearch({ search, page }));
  }, [page]);

  const searchMyProjects = () => {
    if (search.trim()) {
      dispatch(getMyProjectsBySearch({ search, page: 1 }));

      navigate(`/myProjects?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/myProjects');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchMyProjects();
    }
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Typography variant="h5" fontWeight={700}>
          My Projects
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

        <ProjectTable projects={projects} projectDetails />
      </Box>

      <CustomPagination
        path={`/myProjects${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default MyProjects;
