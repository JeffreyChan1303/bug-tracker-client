import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { claimTicket } from '../../../services/ticket/unassignedTicketsSlice';
import { handleAlerts } from '../../../services/alertsSlice';
import ProjectTickets from './projectTickets';
import ProjectUsers from './projectUsers';

const AssignTicket = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState({ _id: '', name: '' });
  const [selectedTicket, setSelectedTicket] = useState({ _id: '', title: '' });

  const assignTicket = () => {
    if (!selectedUser.name) {
      dispatch(
        handleAlerts({ severity: 'warning', message: 'Please choose a user to assign a ticket to' })
      );
    }

    if (!selectedTicket.title) {
      dispatch(handleAlerts({ severity: 'warning', message: 'Please choose a ticket to assign' }));
    }

    if (selectedUser.name && selectedTicket.title) {
      // make it so the user is in the body of the request. so we can assign someone a ticket by telling that the selected user wants to claim the ticket
      dispatch(claimTicket({ userId: selectedUser._id, ticketId: selectedTicket._id }));
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };
  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <>
      Assign ticket page
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <ProjectUsers projectId={projectId} handleSelectUser={handleSelectUser} />
          </Grid>

          <Grid item xs={12} lg={7}>
            <ProjectTickets projectId={projectId} handleSelectTicket={handleSelectTicket} />
          </Grid>
        </Grid>

        {/* THIS IS WHERE I LEFT OFF!!! finish this page */}
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ border: 1, borderRadius: 2, p: 1, mt: 3 }}>
          <Box>
            <Typography>Selected User: {selectedUser.name}</Typography>

            {/* maybe put a box here to wrap the selected user */}
          </Box>

          <ArrowForwardIcon />

          <Box>
            <Typography>Selected Ticket: {selectedTicket.title}</Typography>

            {/* maybe put a box here to wrap the selected ticket */}
          </Box>

          <ArrowForwardIcon />

          <Button variant="outlined" onClick={assignTicket}>
            Assign Ticket
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default AssignTicket;
