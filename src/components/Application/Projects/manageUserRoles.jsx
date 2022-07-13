import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Select,
  MenuItem,
  Chip,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  getProjectDetails,
  updateUsersRoles,
  deleteUsersFromProject,
} from '../../../services/project/projectDetailsSlice';
import { handleAlerts } from '../../../services/alertsSlice';
import SelectFromAllUsers from '../Users/selectFromAllUsers';

const ManageUserRoles = () => {
  const { projectId } = useParams();
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const {
    project: { users: currentProjectUsers },
    loading: getProjectDetailsLoading,
  } = useSelector((state) => state.projectDetails);
  const [selectedUsers, setSelectedUsers] = useState({});

  useEffect(() => {
    dispatch(getProjectDetails(projectId));
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleDelete = (userId) => {
    // if the index is not equal, we filter that item out
    // setSelectedUsers(selectedUsers.filter((user, i) => i != index));

    setSelectedUsers((current) => {
      const copy = { ...current }; // we need to do this because not spreading and just using 'current' will make it configure or mutate the original state of the app
      delete copy[userId];
      return copy;
    });
  };

  const handleSave = () => {
    if (role === '' || Object.keys(selectedUsers).length <= 0) {
      dispatch(
        handleAlerts({
          severity: 'warning',
          message: 'Plase select valid users and a specific role to assign the users',
        })
      );
    } else {
      dispatch(updateUsersRoles({ projectId, users: selectedUsers, role }));
      dispatch(getProjectDetails(projectId));
    }
  };

  const handleClear = () => {
    setSelectedUsers({});
  };

  const handleAddUser = (userId, name, email) => {
    if (selectedUsers[userId]) {
      dispatch(
        handleAlerts({ severity: 'warning', message: 'This user has already been selected' })
      );
    } else {
      setSelectedUsers({ ...selectedUsers, [userId]: { name, email } });
    }
  };

  const handleDeleteUsersFromProject = () => {
    dispatch(deleteUsersFromProject({ projectId, users: { ...selectedUsers } }));
  };

  return getProjectDetailsLoading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Grid container spacing="30px">
      <Grid item xs={12} md={5}>
        <Typography fontWeight={700}>Current Project Users</Typography>
        <Box
          sx={{ border: 1, borderColor: 'black', borderRadius: '1px', p: '10px' }}
          maxHeight="200px">
          {currentProjectUsers &&
            Object.keys(currentProjectUsers).map((userId) => (
              <Button
                key={userId}
                size="small"
                fullWidth
                sx={{ justifyContent: 'space-between', p: '0 5px' }}
                onClick={() =>
                  handleAddUser(
                    userId,
                    currentProjectUsers[userId].name,
                    currentProjectUsers[userId].email
                  )
                }>
                <Typography variant="inherit">Name: {currentProjectUsers[userId].name}</Typography>
                <Typography variant="inherit">Role: {currentProjectUsers[userId].role}</Typography>
              </Button>
            ))}
        </Box>

        <Divider sx={{ m: '20px' }} />

        <Typography variant="body1" fontWeight={700}>
          Selected Users
        </Typography>
        <Box sx={{ border: 1, borderColor: 'black', borderRadius: '1px', p: '10px' }}>
          {Object.keys(selectedUsers).map((userId) => (
            <Chip
              key={userId}
              variant="outlined"
              label={selectedUsers[userId].name}
              onDelete={() => handleDelete(userId)}
              color="primary"
            />
          ))}
        </Box>

        <Typography variant="body1" fontWeight={700}>
          Assign Role
        </Typography>
        <Select value={role} onChange={handleRoleChange} sx={{ mb: 2 }} size="small" fullWidth>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Project Manager">Project Manager</MenuItem>
        </Select>

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleClear} sx={{ m: '10px 17px' }}>
          Clear Selected Users
        </Button>
        <Button variant="outlined" color="warning" onClick={handleDeleteUsersFromProject}>
          Delete Users From Project
        </Button>
      </Grid>

      {/* All Users Section... this section should be made into its own component */}
      <Grid item xs={12} md={7}>
        <SelectFromAllUsers
          path={`/projectDetails/manageUserRoles/${projectId}`}
          handleAddSelectedUser={handleAddUser}
        />
      </Grid>
    </Grid>
  );
};

export default ManageUserRoles;
