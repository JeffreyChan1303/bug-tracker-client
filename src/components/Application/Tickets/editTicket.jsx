import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTicketDetails, updateTicket } from '../../../services/ticket/ticketDetailsSlice';
import { handleAlerts } from '../../../services/alertsSlice';

const initialTicketData = {
  creator: '',
  title: '',
  description: '',
  priority: 'High',
  status: 'New',
};

const EditTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    updateTicket: { loading },
    ticket,
  } = useSelector((state) => state.ticketDetails);
  const [ticketData, setTicketData] = useState(initialTicketData);

  const handleUsePrevTicketValues = () => {
    setTicketData({
      ...ticketData,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      type: ticket.type,
    });
  };

  useEffect(() => {
    dispatch(getTicketDetails(ticketId));
  }, []);

  useEffect(() => {
    setTicketData({
      ...ticketData,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      type: ticket.type,
    });
  }, [ticket]);

  const handlePriorityChange = (event) => {
    setTicketData({ ...ticketData, priority: event.target.value });
  };
  const handleStatusChange = (event) => {
    setTicketData({ ...ticketData, status: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ticketData.title === '') {
      dispatch(handleAlerts({ severity: 'warning', message: 'invalid title' }));
    }
    if (ticketData.description === '') {
      dispatch(handleAlerts({ severity: 'warning', message: 'invalid description' }));
    }

    if (ticketData.title !== '' && ticketData.description !== '') {
      dispatch(updateTicket({ ...ticketData, ticketId }));
      navigate('/allTickets');
    }
  };

  const handleClear = () => {
    setTicketData(initialTicketData);
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <>
      <Typography variant="h5" marginBottom={1}>
        Editing Ticket Id: {ticketId}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: { md: '700px' } }} elevation={3}>
        <form autoComplete="off" noValidate style={{}}>
          <Typography variant="body1" fontWeight={700}>
            Ticket Title
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            fullWidth
            multiline
            size="small"
            sx={{ mb: 2 }}
            value={ticketData.title}
            onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
          />

          <Typography variant="body1" fontWeight={700}>
            Ticket Description
          </Typography>
          <TextField
            name="description"
            variant="outlined"
            fullWidth
            multiline
            size="small"
            sx={{ mb: 2 }}
            rows={4}
            value={ticketData.description}
            onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
          />

          <Typography variant="body1" fontWeight={700}>
            Ticket Priority
          </Typography>
          <Select
            value={ticketData.priority}
            onChange={handlePriorityChange}
            sx={{ mb: 2 }}
            fullWidth
            size="small"
          >
            <MenuItem value="Low">Low Priority</MenuItem>
            <MenuItem value="Medium">Medium Priority</MenuItem>
            <MenuItem value="High">High Priority</MenuItem>
          </Select>

          <Typography variant="body1" fontWeight={700}>
            Ticket Status
          </Typography>
          <Select
            value={ticketData.status}
            onChange={handleStatusChange}
            sx={{ mb: 2 }}
            fullWidth
            size="small"
          >
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="Testing">Testing</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
            <MenuItem value="Unassigned">Unassigned</MenuItem>
          </Select>

          <Grid container gap={2}>
            <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" size="small" onClick={handleClear}>
              Clear
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleUsePrevTicketValues}
            >
              use default ticket values
            </Button>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default EditTicket;
