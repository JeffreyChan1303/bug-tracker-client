import react, { useState, useEffect } from 'react';
import { Paper, Grid, Table, TableCell, Typography, Box, TableRow, TableHead, TableBody, TextField, CircularProgress, Divider, Select, MenuItem, Chip, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux'

import { getAllUsers, getAllUsersBySearch } from '../../../services/user/allUsersSlice';
import { getProjectDetails, updateUsersRoles, deleteUsersFromProject } from '../../../services/project/projectDetailsSlice';
import { handleAlerts } from '../../../services/alertsSlice';
import CustomPagination from '../pagination';

const BoldedTableCell = styled(TableCell) (({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell) (({theme}) => ({
    padding: "5px",
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ManageUserRoles = () => {
    const { id } = useParams();
    const query = useQuery();
    const page = query.get('page');
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();
    const { users: allUsers, loading: getAllUsersLoading, currentPage, numberOfPages } = useSelector(state => state.allUsers)
    const { project: { users: currentProjectUsers, _id: projectId }, loading: getProjectDetailsLoading } = useSelector(state => state.projectDetails)
    const [selectedUsers, setSelectedUsers] = useState({});

    useEffect(() => {
        dispatch(getProjectDetails(id));
    }, [])

    useEffect(() => {
        if (search.trim()) {
            dispatch(getAllUsersBySearch({ search, page }));
        } else {
            dispatch(getAllUsers(page));
        }
    }, [page])

    const searchAllUsers = () => {
        if (search.trim()) {
            dispatch(getAllUsersBySearch({ search, page: 1 }));
            navigate(`/projectDetails/manageUserRoles/${id}/search?searchQuery=${search || 'none'}&page=1`);
        } else {
            navigate(`/projectDetails/manageUserRoles/${id}`);
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchAllUsers();
        }
    }

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
        getAllUsersLoading || getProjectDetailsLoading ? <CircularProgress color="inherit" /> : 
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
                    <Paper sx={{ p: 3 }} elevation={1} >
                        <Box sx={{  overflowX: 'scroll' }} >

                            <Typography variant="h6" fontWeight={700}> All Users </Typography>
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
                            <Table sx={{  }} aria-label="simple table" size="small" >
                                <TableHead>
                                    <TableRow >
                                        <BoldedTableCell>User Name</BoldedTableCell>
                                        <BoldedTableCell align="left">Email</BoldedTableCell>
                                        <BoldedTableCell align="center">Actions</BoldedTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {allUsers && allUsers.map((user, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <ContentTableCell component="th" scope="row">
                                            {user.name}
                                        </ContentTableCell>
                                        <ContentTableCell align="left">{user.email}</ContentTableCell>
                                        <ContentTableCell align="center">
                                            <IconButton onClick={() => handleAddUser(user._id, user.name, user.email)}>
                                                <AddIcon />
                                            </IconButton>
                                        </ContentTableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>

                        </Box>

                        <CustomPagination 
                            path={`/projectDetails/manageUserRoles/${id}${search.trim()? `/search?searchQuery=${search}&` : `?`}`}
                            page={page}
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default ManageUserRoles;