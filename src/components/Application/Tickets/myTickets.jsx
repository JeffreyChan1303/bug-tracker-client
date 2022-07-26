import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, TextField, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMyTicketsBySearch } from '../../../services/ticket/myTicketsSlice';
import CustomPagination from '../pagination';
import TicketTable from './ticketTable';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MyTickets = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page');
  const [search, setSearch] = useState('');
  // useSelector may be useful when we implement the dashboard which requires multiple api calls
  const { loading, tickets, currentPage, numberOfPages } = useSelector((state) => state.myTickets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyTicketsBySearch({ search, page }));
  }, [page]);

  const searchMyTickets = () => {
    if (search.trim()) {
      dispatch(getMyTicketsBySearch({ search, page: 1 }));

      navigate(`/myTickets?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/myTickets');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchMyTickets();
    }
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={1}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            My Tickets
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

        <TicketTable tickets={tickets} ticketDetails />
      </Box>

      <CustomPagination
        path={`/myTickets${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default MyTickets;
