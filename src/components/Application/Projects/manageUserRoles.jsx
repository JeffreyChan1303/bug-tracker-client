import react, { useState, useEffect } from 'react';
import { Paper, Grid, Table, TableCell, Typography, Box, TableRow, TableHead, TableBody, TextField, CircularProgress } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux'

import { getAllUsers, getAllUsersBySearch } from '../../../services/user/manageUserRolesSlice';
import { getProjectDetails } from '../../../services/project/projectDetailsSlice';
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
    const dispatch = useDispatch();
    const { users, loading, currentPage, numberOfPages } = useSelector(state => state.manageUserRoles)

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


    return (
        loading ? <CircularProgress coloe="inherit" /> : 
        <>
            This is the Manage User Roles Page
            <Grid container >
                <Grid item xs={12} md={5} >

                </Grid>
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
                                        <BoldedTableCell align="left">Roles</BoldedTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {users && users.map((user, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <ContentTableCell component="th" scope="row">
                                            {user.name}
                                        </ContentTableCell>
                                        <ContentTableCell align="left">{user.email}</ContentTableCell>
                                        <ContentTableCell align="left">role??</ContentTableCell>
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