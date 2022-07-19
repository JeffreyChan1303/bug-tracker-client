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
  updateUsersRoles,
  deleteUsersFromProject,
  getProjectUsers,
  inviteUsersToProject,
} from '../../../services/project/projectUsersSlice';
import { handleAlerts } from '../../../services/alertsSlice';
import SelectFromAllUsers from '../Users/selectFromAllUsers';

const ManageUserRoles = () => {
  const { projectId } = useParams();
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const {
    projectUsers: { original: currentProjectUsers },
    getProjectUsers: { loading },
  } = useSelector((state) => state.projectUsers);

  const [selectedUsers, setSelectedUsers] = useState({});

  useEffect(() => {
    dispatch(getProjectUsers(projectId));
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

  const handleSave = async () => {
    if (role === '' || Object.keys(selectedUsers).length <= 0) {
      dispatch(
        handleAlerts({
          severity: 'warning',
          message: 'Plase select valid users and a specific role to assign the users',
        })
      );
    } else {
      // this parses the selected users that are in the project and not in the project
      const selectedProjectUsers = {};
      const selectedNonProjectUsers = {};
      Object.keys(selectedUsers).map((userId) => {
        if (currentProjectUsers[userId]) {
          selectedProjectUsers[userId] = selectedUsers[userId];
        } else {
          selectedNonProjectUsers[userId] = selectedUsers[userId];
        }
      });

      if (Object.keys(selectedProjectUsers).length !== 0) {
        await dispatch(updateUsersRoles({ projectId, users: selectedProjectUsers, role }));
      }
      if (Object.keys(selectedNonProjectUsers).length !== 0) {
        await dispatch(inviteUsersToProject({ projectId, users: selectedNonProjectUsers, role }));
      }
      dispatch(getProjectUsers(projectId));
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

  const handleDeleteUsersFromProject = async () => {
    await dispatch(deleteUsersFromProject({ projectId, users: { ...selectedUsers } }));
    dispatch(getProjectUsers(projectId));
    setSelectedUsers({});
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Grid container spacing="30px">
      <Grid item xs={12} lg={5}>
        <Typography fontWeight={700}>Current Project Users</Typography>
        <Box
          sx={{ border: 1, borderColor: 'black', borderRadius: '1px', p: '10px' }}
          maxHeight="200px"
        >
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
                }
              >
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
      <Grid item xs={12} lg={7}>
        <SelectFromAllUsers
          path={`/projectDetails/manageUserRoles/${projectId}`}
          handleAddSelectedUser={handleAddUser}
        />
      </Grid>
    </Grid>
  );
};

export default ManageUserRoles;
