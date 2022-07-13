import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Tooltip,
  TextField,
  Chip,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { getArchivedProjectsBySearch } from '../../../services/project/projectArchiveSlice';
import CustomPagination from '../pagination';

const BoldedTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  padding: '8px 5px',
}));

const ContentTableCell = styled(TableCell)(() => ({
  padding: '5px',
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProjectArchive = () => {
  const query = useQuery();
  const navigate = useNavigate();
  // const location = useLocation();
  const page = query.get('page');
  // const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const { loading, projects, currentPage, numberOfPages } = useSelector(
    (state) => state.projectArchive
  );
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

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Typography variant="h5" fontWeight={700}>
          {' '}
          Archived Projects{' '}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Typography align="right" variant="body1">
            {' '}
            Search:&nbsp;{' '}
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <BoldedTableCell>Title</BoldedTableCell>
              <BoldedTableCell sx={{ fontWeight: 600 }} align="right">
                Submitted By
              </BoldedTableCell>
              <BoldedTableCell align="right">Developer</BoldedTableCell>
              <BoldedTableCell align="right">Status</BoldedTableCell>
              <BoldedTableCell align="right">Priority</BoldedTableCell>
              <BoldedTableCell align="right">Last Updated</BoldedTableCell>
              <BoldedTableCell align="center">Actions</BoldedTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects &&
              projects.map((project) => (
                <TableRow
                  key={project._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                  <ContentTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="View">
                      <IconButton onClick={() => navigate(`/projectDetails/${project._id}`)}>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    {/* This should be changed to retrieve */}
                    <Tooltip title="Retrieve">
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
        path={`/archivedProjects${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default ProjectArchive;
