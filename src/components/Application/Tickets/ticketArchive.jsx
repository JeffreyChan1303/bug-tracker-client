import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getArchivedTicketsBySearch } from '../../../services/ticket/ticketArchiveSlice';
import { restoreTicketFromArchive } from '../../../services/ticket/ticketDetailsSlice';
import CustomPagination from '../pagination';
import TicketTable from './ticketTable';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TicketArchive = () => {
  const query = useQuery();
  const navigate = useNavigate();
  // const location = useLocation();
  const page = query.get('page');
  // const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const { loading, tickets, currentPage, numberOfPages } = useSelector(
    (state) => state.ticketArchive
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArchivedTicketsBySearch({ search, page }));
  }, [page]);

  const searchArchivedTickets = () => {
    if (search.trim()) {
      dispatch(getArchivedTicketsBySearch({ search, page: 1 }));
      navigate(`/ticketArchive?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/ticketArchive');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchArchivedTickets();
    }
  };

  const handleRestoreTicket = async (id) => {
    await dispatch(restoreTicketFromArchive(id));
    navigate('/myTickets');
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Typography variant="h5" fontWeight={700}>
          {' '}
          Archived Tickets{' '}
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

        <TicketTable tickets={tickets} ticketDetails handleRestoreTicket={handleRestoreTicket} />
      </Box>

      <CustomPagination
        path={`/ticketArchive${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default TicketArchive;
