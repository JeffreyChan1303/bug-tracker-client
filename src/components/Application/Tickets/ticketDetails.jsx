import React, { useEffect } from 'react';
import { Paper, Grid, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTicketDetails,
  moveTicketToArchive,
  deleteTicketFromArchive,
  restoreTicketFromArchive,
  deleteSupportTicket,
} from '../../../services/ticket/ticketDetailsSlice';

import TicketInformation from './ticketInformation';
import TicketComments from './ticketComments';
import TicketHistory from './ticketHistory';
import { getDateFromISODate } from '../../Utility/formatDate';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getTicketDetails: { loading },
    ticket,
    ticket: { ticketHistory },
  } = useSelector((state) => state.ticketDetails);
  const { authData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTicketDetails(ticketId));
  }, []);

  // checks to see if ticket is a archived ticket or not
  const isArchived = ticket.status === 'Archived';
  const handleDeleteTicket = async () => {
    if (ticket.status === 'Archived') {
      await dispatch(deleteTicketFromArchive(ticketId));
      navigate('/ticketArchive');
    } else if (ticket.type === 'Support') {
      await dispatch(deleteSupportTicket(ticketId));
      navigate('/allSupportTickets');
    } else {
      await dispatch(moveTicketToArchive(ticketId));
      navigate('/myTickets');
    }
  };

  const handleRecoverTicket = () => {
    dispatch(restoreTicketFromArchive(ticketId));
    navigate('/myTickets');
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Grid container>
          {/* This is the ticket information section and buttons */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
              <TicketInformation ticket={ticket} getDateFromISODate={getDateFromISODate} />

              <Grid container alignItems="center" gap={1} marginTop="10px">
                {isArchived ? (
                  <Button variant="outlined" onClick={handleRecoverTicket}>
                    Recover
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/editTicket/${ticketId}`)}
                    disabled={
                      (ticket.type === 'Support' && ticket.creator !== authData?.userObject._id) ||
                      (authData?.userObject._id !== ticket.creator &&
                        authData?.userObject._id !== ticket.developer?._id)
                    }
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/projectDetails/${ticket.project._id}`)}
                  disabled={ticket.type === 'Support'}
                >
                  Ticket Project
                </Button>

                <Button variant="outlined" onClick={handleDeleteTicket}>
                  Delete
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
