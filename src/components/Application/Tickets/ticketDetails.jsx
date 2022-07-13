import React, { useEffect } from 'react';
import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  getTicketDetails,
  moveTicketToArchive,
  deleteTicketFromArchive,
  restoreTicketFromArchive,
} from '../../../services/ticket/ticketDetailsSlice';

import TicketInformation from './ticketInformation';
import TicketComments from './ticketComments';

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
                  onClick={() => navigate(`/projectDetails/${ticket.project._id}`)}>
                  Ticket Project
                </Button>
              </Grid>
            </Paper>
          </Grid>

          {/* This is the Ticket History section */}
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Accordion elevation={0} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid container justifyContent="space-between">
                    <Typography fontWeight={700}>Ticket History</Typography>
                    <Typography fontWeight={700} sx={{ pr: '50px' }}>
                      Number of Entries: {ticketHistory?.length}
                    </Typography>
                  </Grid>
                </AccordionSummary>

                {ticketHistory?.map((prevTicket) => (
                  <AccordionDetails key={prevTicket.updatedAt}>
                    <Grid container justifyContent="space-between">
                      <Typography fontWeight={700}>Title: {prevTicket.title}</Typography>
                      <Typography fontWeight={700}>Updated At: {prevTicket.updatedAt}</Typography>
                    </Grid>
                    <Typography>Description: {prevTicket.description}</Typography>
                    <Typography>Priority: {prevTicket.priority}</Typography>
                    <Typography>Status: {prevTicket.status}</Typography>
                  </AccordionDetails>
                ))}
              </Accordion>
            </Paper>
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
