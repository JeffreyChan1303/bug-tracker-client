import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { claimTicket } from '../../../services/ticket/unassignedTicketsSlice';
import { handleAlerts } from '../../../services/alertsSlice';
import ProjectTickets from './projectTickets';
import ProjectUsers from './projectUsers';

const AssignTicket = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState({ _id: '', name: '' });
  const [selectedTicket, setSelectedTicket] = useState({ _id: '', title: '' });

  const assignTicket = async () => {
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
      await dispatch(claimTicket({ userId: selectedUser._id, ticketId: selectedTicket._id }));
      navigate(`/projectDetails/assignTicket/${projectId}`);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };
  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} marginBottom={1}>
        Assign Ticket
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <ProjectUsers handleSelectUser={handleSelectUser} />
        </Grid>

        <Grid item xs={12} lg={7}>
          <ProjectTickets handleSelectTicket={handleSelectTicket} />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ border: 1, borderRadius: 1, p: 1, mt: 3 }}
      >
        <Box>
          <Typography>Selected User: {selectedUser.name}</Typography>
        </Box>

        <ArrowForwardIcon />

        <Box>
          <Typography>Selected Ticket: {selectedTicket.title}</Typography>
        </Box>

        <ArrowForwardIcon />

        <Button variant="outlined" onClick={assignTicket}>
          Assign Ticket
        </Button>
      </Grid>
    </Paper>
  );
};

export default AssignTicket;
