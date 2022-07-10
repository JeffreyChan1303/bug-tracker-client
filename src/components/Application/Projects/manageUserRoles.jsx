import react, { useState, useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress, Divider, Select, MenuItem, Chip, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { getProjectDetails, updateUsersRoles, deleteUsersFromProject } from '../../../services/project/projectDetailsSlice';
import { handleAlerts } from '../../../services/alertsSlice';
import SelectFromAllUsers from '../Users/selectFromAllUsers';


const ManageUserRoles = () => {
    const { id } = useParams();
    const [role, setRole] = useState('');
    const dispatch = useDispatch();
    const { project: { users: currentProjectUsers, _id: projectId }, loading: getProjectDetailsLoading } = useSelector(state => state.projectDetails)
    const [selectedUsers, setSelectedUsers] = useState({});

    useEffect(() => {
        dispatch(getProjectDetails(id));
    }, [])


    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const handleDelete = (id) => {
        // if the index is not equal, we filter that item out
        // setSelectedUsers(selectedUsers.filter((user, i) => i != index));

        setSelectedUsers(current => {
            const copy = { ...current }; // we need to do this because not spreading and just using 'current' will make it configure or mutate the original state of the app
            delete copy[id];
            return copy
        })
    }

    const handleSave = () => {
        if (role === '' || Object.keys(selectedUsers).length <= 0) {
            dispatch(handleAlerts({ severity: 'warning', message: 'Plase select valid users and a specific role to assign the users'}));
        } else {
            dispatch(updateUsersRoles({ projectId: id, users: selectedUsers, role: role }))
            dispatch(getProjectDetails(id));
        }
    }

    const handleClear = () => {
        setSelectedUsers({});
    }

    const handleAddUser = (id, name, email) => {
        if (selectedUsers[id]) {
            dispatch(handleAlerts({ severity: "warning", message: "This user has already been selected" }))
        } else {
            setSelectedUsers({...selectedUsers, [id]: { name: name, email: email } });
        }
    }

    const handleDeleteUsersFromProject = () => {
        dispatch(deleteUsersFromProject({ projectId: id, users: { ...selectedUsers }}))
    }



    return (
        getProjectDetailsLoading ? <CircularProgress color="inherit" /> : 
        <>
            <Grid container spacing="30px" >
                <Grid item xs={12} md={5} >
                    <Typography fontWeight={700}>Current Project Users</Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "1px", p: "10px" }} maxHeight="200px">
                        {currentProjectUsers &&
                        Object.keys(currentProjectUsers).map((id, index) => (
                            <Button key={index} 
                                size="small" fullWidth  
                                sx={{ justifyContent: "space-between", p: "0 5px" }}
                                onClick={() => handleAddUser(id, currentProjectUsers[id].name, currentProjectUsers[id].email)}
                            >
                                <Typography variant="inherit">Name: {currentProjectUsers[id].name}</Typography>
                                <Typography variant="inherit">Role: {currentProjectUsers[id].role}</Typography>
                            </Button>
                            
                        ))}
                    </Box>

                    <Divider sx={{ m: "20px" }} />

                    <Typography variant="body1" fontWeight={700}>Selected Users</Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "1px", p: "10px" }}>
                        {Object.keys(selectedUsers).map((id, index) => (
                            <Chip 
                                key={index} 
                                variant="outlined" 
                                label={selectedUsers[id].name} 
                                onDelete={() => handleDelete(id)} 
                                color="primary" 
                            />
                        ))}
                    </Box>

                    <Typography variant="body1" fontWeight={700}>Assign Role</Typography>
                    <Select
                        value={role}
                        onChange={handleRoleChange}
                        sx={{ mb: 2 }}
                        size="small"
                        fullWidth
                    >
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                        <MenuItem value={"Developer"}>Developer</MenuItem>
                        <MenuItem value={"Project Manager"}>Project Manager</MenuItem>
                    </Select>

                    <Button variant="contained" onClick={handleSave}>Save</Button>
                    <Button variant="outlined" onClick={handleClear} sx={{ m: "10px 17px" }}>Clear Selected Users</Button>
                    <Button variant="outlined" color="warning" onClick={handleDeleteUsersFromProject}>Delete Users From Project</Button>
                </Grid>

                {/* All Users Section... this section should be made into its own component */}
                <Grid item xs={12} md={7}>
                    <SelectFromAllUsers path={`/projectDetails/manageUserRoles/${id}`} handleAddSelectedUser={handleAddUser} />
                </Grid>
            </Grid>
        </>
    )
}

export default ManageUserRoles;