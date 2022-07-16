import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllTicketsBySearch } from '../../../services/ticket/allTicketsSlice';
import CustomPagination from '../pagination';
import TicketTable from './ticketTable';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllTickets = () => {
  const query = useQuery();
  const navigate = useNavigate();
  // const location = useLocation();
  const page = query.get('page');
  // const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const { loading, tickets, currentPage, numberOfPages } = useSelector((state) => state.allTickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTicketsBySearch({ search, page }));
  }, [page]);

  const searchAllTickets = () => {
    if (search.trim()) {
      dispatch(getAllTicketsBySearch({ search, page: 1 }));
      navigate(`/allTickets?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/allTickets');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchAllTickets();
    }
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            All Tickets
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Typography align="right" variant="body1">
              Search:&nbsp;
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

        <TicketTable tickets={tickets} ticketDetails editTicket />
      </Box>

      <CustomPagination
        path={`/allTickets${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default AllTickets;
