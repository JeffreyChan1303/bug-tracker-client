import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableCell,
  Typography,
  Box,
  Grid,
  TableRow,
  TableHead,
  TableBody,
  TextField,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import { getAllUsersBySearch } from '../../../services/user/allUsersSlice';

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

const SelectFromAllUsers = ({ path, handleSelectUser }) => {
  const query = useQuery();
  const page = query.get('page');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {
    users: allUsers,
    loading: getAllUsersLoading,
    currentPage,
    numberOfPages,
  } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsersBySearch({ search, page }));
  }, [page]);

  const searchAllUsers = () => {
    if (search.trim()) {
      dispatch(getAllUsersBySearch({ search, page: 1 }));
      navigate(`${path}?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate(`${path}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchAllUsers();
    }
  };

  return (
    <Paper sx={{ p: 3 }} elevation={1}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            All Users
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
        </Grid>
        <Table sx={{}} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <BoldedTableCell>User Name</BoldedTableCell>
              <BoldedTableCell align="left">Email</BoldedTableCell>
              <BoldedTableCell align="center">Actions</BoldedTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!getAllUsersLoading &&
              allUsers &&
              allUsers.map((user) => (
                <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <ContentTableCell component="th" scope="row">
                    {user.name}
                  </ContentTableCell>
                  <ContentTableCell align="left">{user.email}</ContentTableCell>
                  <ContentTableCell align="center">
                    <IconButton
                      onClick={() =>
                        handleSelectUser({ _id: user._id, name: user.name, email: user.email })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </ContentTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <CustomPagination
        path={`${path}${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default SelectFromAllUsers;
