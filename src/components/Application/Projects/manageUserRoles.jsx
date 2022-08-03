import React, { useState } from 'react';
import { Grid, Typography, Box, Divider, Select, MenuItem, Chip, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  // updateUsersRoles,
  deleteUsersFromProject,
  getProjectUsers,
  // inviteUsersToProject,
  addUsersToProject,
} from '../../../services/project/projectUsersSlice';
import { handleAlerts } from '../../../services/alertsSlice';
import SelectFromAllUsers from '../Users/selectFromAllUsers';
import ProjectUsers from './projectUsers';

const ManageUserRoles = () => {
  const { projectId } = useParams();
  const [role, setRole] = useState('');
  const dispatch = useDispatch();

  const [selectedUsers, setSelectedUsers] = useState({});

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleDelete = (userId) => {
    setSelectedUsers((current) => {
      // this is needed because not spreading and just using 'current' will make it configure or mutate the original state of the app
      const copy = { ...current };
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
      await dispatch(addUsersToProject({ projectId, selectedUsers, role }));
      dispatch(getProjectUsers(projectId));
    }
  };

  const handleClear = () => {
    setSelectedUsers({});
  };

  const handleSelectUser = ({ _id, name, email }) => {
    if (selectedUsers[_id]) {
      dispatch(
        handleAlerts({ severity: 'warning', message: 'This user has already been selected' })
      );
    } else {
      setSelectedUsers({ ...selectedUsers, [_id]: { name, email } });
    }
  };

  const handleDeleteUsersFromProject = async () => {
    const userArr = Object.keys(selectedUsers);
    if (userArr.length <= 0) {
      dispatch(
        handleAlerts({
          severity: 'warning',
          message: 'Plase select a user to delete',
        })
      );
    } else if (userArr.length > 1) {
      dispatch(
        handleAlerts({
          severity: 'warning',
          message: 'Plase only select 1 user to delete',
        })
      );
    } else {
      await dispatch(deleteUsersFromProject({ projectId, users: { ...selectedUsers } }));
      dispatch(getProjectUsers(projectId));
      setSelectedUsers({});
    }
  };

  return (
    <Grid container spacing="30px">
      <Grid item xs={12} lg={5}>
        <ProjectUsers projectId={projectId} handleSelectUser={handleSelectUser} />

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
          Kick Users From Project
        </Button>
      </Grid>

      {/* All Users Section */}
      <Grid item xs={12} lg={7}>
        <SelectFromAllUsers
          path={`/projectDetails/manageUserRoles/${projectId}`}
          handleSelectUser={handleSelectUser}
        />
      </Grid>
    </Grid>
  );
};

export default ManageUserRoles;
