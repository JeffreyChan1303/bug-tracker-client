import react, { useState, useEffect } from 'react';
import { Paper, Grid, Table, TableCell, Typography, Box, TableRow, TableHead, TableBody, TextField, CircularProgress, Divider, Select, MenuItem, Chip, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux'

import { getAllUsers, getAllUsersBySearch } from '../../../services/user/allUsersSlice';
import { getProjectDetails, updateUsersRoles } from '../../../services/project/projectDetailsSlice';
import { handleAlerts } from '../../../services/crudFeedbackSlice';
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
    const [role, setRole] = useState('Developer');
    const dispatch = useDispatch();
    const { users: allUsers, loading: getAllUsersLoading, currentPage, numberOfPages } = useSelector(state => state.allUsers)
    const { project: { users: currentProjectUsers }, loading: getProjectDetailsLoading } = useSelector(state => state.projectDetails)

    const [selectedUsers, setSelectedUsers] = useState([]);

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

    const handleDelete = (index) => {
        // if the index is not equal, we filter that item out
        setSelectedUsers(selectedUsers.filter((user, i) => i != index));
    }

    const handleSave = () => {

    }

    const handleClear = () => {
        setSelectedUsers([]);
    }

    const handleAddUser = (name, id) => {
        let isSelected = false;
        for (let i = 0; i < selectedUsers.length; i++) {
            if (selectedUsers[i].id === id) {
                dispatch(handleAlerts({ severity: "warning", message: "This user has already been selected" }))
                isSelected = true;
            }
        }
        if (!isSelected) {
            setSelectedUsers([...selectedUsers, { id: id, name: name }]);
        }
    }


    return (
        getAllUsersLoading || getProjectDetailsLoading ? <CircularProgress coloe="inherit" /> : 
        <>
            <Grid container spacing="30px" >
                <Grid item xs={12} md={5} >
                    <Typography fontWeight={700}>Current Project Users</Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "1px", p: "10px" }} maxHeight="200px">
                        
                        {currentProjectUsers.map((user, index) => (
                            <Typography variant="body1">
                                {user.name} 
                                {/* MAKE THIS NOW!!! make the api calls that add and delete users adn how they interact witht he project!! */}
                                {/* Objects in here should have a name, id, email, data added, and role. this object is stored in the project.users section!! */}
                            </Typography>
                        ))}

                        <Box sx={{  }}>
                            <Button size="small" fullWidth sx={{ justifyContent: "space-between", p: "0 5px" }}>
                                    <Typography variant="inherit">Name: andy</Typography>
                                    <Typography variant="inherit">Role: Developer</Typography>
                            </Button>
                        </Box>
                        <Button size="small" fullWidth sx={{ justifyContent: "flex-start", p: "0 5px" }}>
                                andy
                        </Button>
                        <Button size="small" fullWidth sx={{ justifyContent: "flex-start", p: "0 5px" }}>
                                andy
                        </Button>
                    </Box>

                    <Divider sx={{ m: "20px" }} />

                    <Typography variant="body1" fontWeight={700}>Selected Users</Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "1px", p: "10px" }}>
                        {selectedUsers.map((user, index) => (
                            <Chip 
                                key={index} 
                                variant="outlined" 
                                label={user.name} 
                                onDelete={() => handleDelete(index)} 
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
                    <Button variant="outlined" onClick={handleClear}>Clear</Button>
                </Grid>

                {/* All Users Section */}
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
                                            <IconButton onClick={() => handleAddUser(user.name, user._id)}>
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