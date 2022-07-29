import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getArchivedProjectsBySearch } from '../../../services/project/projectArchiveSlice';
import CustomPagination from '../pagination';
import ProjectTable from './projectTable';
import { restoreProjectFromArchive } from '../../../services/project/projectDetailsSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProjectArchive = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page');
  const [search, setSearch] = useState('');
  const { loading, projects, currentPage, numberOfPages } = useSelector((state) => state.projectArchive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArchivedProjectsBySearch({ search, page }));
  }, [page]);

  const searchArchivedProjects = () => {
    if (search.trim()) {
      dispatch(getArchivedProjectsBySearch({ search, page: 1 }));
      navigate(`/projectArchive?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/projectArchive');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchArchivedProjects();
    }
  };

  const handleRestoreProject = async (projectId) => {
    await dispatch(restoreProjectFromArchive(projectId));
    navigate('/myProjects');
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Typography variant="h5" fontWeight={700}>
          Archived Projects
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

        <ProjectTable projects={projects} handleRestoreProject={handleRestoreProject} projectDetails />
      </Box>

      <CustomPagination
        path={`/archivedProjects${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default ProjectArchive;
