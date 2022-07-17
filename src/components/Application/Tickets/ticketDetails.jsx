import React, { useEffect } from 'react';
import { Paper, Grid, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTicketDetails,
  moveTicketToArchive,
  deleteTicketFromArchive,
  restoreTicketFromArchive,
} from '../../../services/ticket/ticketDetailsSlice';

import TicketInformation from './ticketInformation';
import TicketComments from './ticketComments';
import TicketHistory from './ticketHistory';

const getDateFromISODate = (ISODate) => {
  const date = new Date(ISODate);
  const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  return string;
};

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getTicketDetails: { loading },
    ticket,
    ticket: { ticketHistory },
  } = useSelector((state) => state.ticketDetails);

  useEffect(() => {
    dispatch(getTicketDetails(ticketId));
  }, []);

  // checks to see if ticket is a archived ticket or not
  const isArchived = ticket.status === 'Archived';
  const handleDeleteTicket = () => {
    if (isArchived) {
      dispatch(deleteTicketFromArchive(ticketId));
      navigate('/ticketArchive');
    } else {
      dispatch(moveTicketToArchive(ticketId));
      navigate('/allTickets');
    }
  };

  const handleRecoverTicket = () => {
    dispatch(restoreTicketFromArchive(ticketId));
    navigate('/allTickets');
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Grid container>
          {/* This is the ticket details section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
              <TicketInformation ticket={ticket} getDateFromISODate={getDateFromISODate} />

              <Grid container>
                {isArchived ? (
                  <Button variant="outlined" onClick={handleRecoverTicket}>
                    Recover
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={() => navigate(`/editTicket/${ticketId}`)}>
                    Edit
                  </Button>
                )}
                <Button variant="outlined" onClick={handleDeleteTicket}>
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/projectDetails/${ticket.project._id}`)}
                >
                  Ticket Project
                </Button>
              </Grid>
            </Paper>
          </Grid>

          {/* This is the Ticket History section */}
          <Grid item xs={12}>
            <TicketHistory ticketHistory={ticketHistory} />
          </Grid>
        </Grid>
      </Grid>

      {/* This is the Ticket Comments Section */}
      <Grid item xs={12} lg={6}>
        <TicketComments ticketId={ticketId} getDateFromISODate={getDateFromISODate} />
      </Grid>
    </Grid>
  );
};

export default TicketDetails;
