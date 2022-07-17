import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from '../../services/alertsSlice';
import { createUsersNotification } from '../../services/user/notificationsSlice';
import { getSupportTicketsBySearch } from '../../services/ticket/supportTicketsSlice';
import TicketTable from './Tickets/ticketTable';
import CustomPagination from './pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllSupportTickets = () => {
  const dispatch = useDispatch();

  const handleTest = () => {
    dispatch(addAlert({ severity: 'warning', message: 'sdfgsdf' }));
  };

  const handleCreateNotification = () => {
    // just for testing
    const { _id } = JSON.parse(localStorage.getItem('profile')).userObject;
    dispatch(
      createUsersNotification({
        users: [_id],
        title: 'notification has been created',
        description: 'Test Message',
      })
    );
  };

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
      navigate(`/supportTickets?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/supportTickets');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchAllTickets();
    }
  };

  return (
    <>
      Send a support Ticket here!!
      <Button variant="outlined" onClick={handleTest}>
        handleTest
      </Button>
      <Button variant="outlined" onClick={() => handleCreateNotification()}>
        Create Notification
      </Button>
      {loading ? (
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
            path={`/allTickets${search.trim() ? `?searchQuery=${search}&` : `?`}`}
            page={page}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        </Paper>
      )}
    </>
  );
};

export default AllSupportTickets;
