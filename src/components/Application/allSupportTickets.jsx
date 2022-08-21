import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSupportTicketsBySearch } from '../../services/ticket/supportTicketsSlice';
import TicketTable from './Tickets/ticketTable';
import CustomPagination from './pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllSupportTickets = () => {
  const dispatch = useDispatch();

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page');
  const [search, setSearch] = useState('');
  const {
    getSupportTicketsBySearch: { loading },
    tickets,
    currentPage,
    numberOfPages,
  } = useSelector((state) => state.supportTickets);

  useEffect(() => {
    dispatch(getSupportTicketsBySearch({ page, search }));
  }, [page]);

  const searchAllTickets = () => {
    if (search.trim()) {
      dispatch(getSupportTicketsBySearch({ search, page: 1 }));
      navigate(`/allSupportTickets?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/allSupportTickets');
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
            All Support Tickets
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
        path={`/allSupportTickets${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default AllSupportTickets;
