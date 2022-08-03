/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  IconButton,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { getProjectUsers, searchProjectUsers } from '../../../services/project/projectUsersSlice';
import { BoldedTableCell, ContentTableCell } from '../../Utility/tableCellStyles';

const ProjectUsers = ({ projectId, handleSelectUser }) => {
  const dispatch = useDispatch();

  const [assignedUsers, setAssignedUsers] = useState({
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 5,
  });

  const {
    getProjectUsers: { loading },
    projectUsers,
  } = useSelector((state) => state.projectUsers);

  useEffect(() => {
    dispatch(getProjectUsers(projectId));
  }, []);

  useEffect(() => {
    dispatch(
      searchProjectUsers({
        searchQuery: assignedUsers.searchQuery,
        currentPage: assignedUsers.currentPage,
        itemsPerPage: assignedUsers.itemsPerPage,
      })
    );
  }, [assignedUsers, projectUsers.original]);

  const handleAssignedUsersPageChange = (page) => {
    setAssignedUsers({ ...assignedUsers, currentPage: page });
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            Project Users
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
              value={assignedUsers.searchQuery}
              onChange={(e) => setAssignedUsers({ ...assignedUsers, searchQuery: e.target.value })}
            />
          </Box>
        </Grid>
        <Table sx={{}} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <BoldedTableCell>User Name</BoldedTableCell>
              <BoldedTableCell align="left">Email</BoldedTableCell>
              <BoldedTableCell align="left">Role</BoldedTableCell>
              {handleSelectUser && <BoldedTableCell align="center">Actions</BoldedTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {projectUsers.searched &&
              projectUsers.searched.map((user) => (
                <TableRow
                  key={user.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <ContentTableCell component="th" scope="row">
                    {user.name}
                  </ContentTableCell>
                  <ContentTableCell align="left">{user.email}</ContentTableCell>
                  <ContentTableCell align="left">{user.role}</ContentTableCell>

                  {handleSelectUser && (
                    <ContentTableCell align="center">
                      <Tooltip title="Select User" disableInteractive>
                        <IconButton
                          onClick={() =>
                            handleSelectUser({ _id: user._id, name: user.name, email: user.email })
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </ContentTableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <Pagination
        sx={{ ul: { justifyContent: 'space-around' }, mt: '20px' }}
        count={projectUsers.numberOfPages}
        page={assignedUsers.currentPage}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Button}
            onClick={() => handleAssignedUsersPageChange(item.page)}
          />
        )}
      />
    </Paper>
  );
};

export default ProjectUsers;
