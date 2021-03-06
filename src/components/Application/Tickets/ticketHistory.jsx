import React from 'react';
import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Box,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getDateFromISODate, getTimeFromISODate } from '../../Utility/formatDate';

const TicketHistory = ({ ticketHistory }) => (
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
        <Box key={prevTicket.updatedAt}>
          <Divider sx={{ width: '90%', m: '0 auto' }} />
          <AccordionDetails>
            <Grid container justifyContent="space-between">
              <Typography fontWeight={700}>Title: {prevTicket.title}</Typography>
              <Typography fontWeight={700}>
                Updated At: {getDateFromISODate(prevTicket.updatedAt)}{' '}
                {getTimeFromISODate(prevTicket.updatedAt)}
              </Typography>
            </Grid>
            <Typography>Description: {prevTicket.description}</Typography>
            <Typography>
              Developer: {prevTicket.developer ? prevTicket.developer?.name : '(none)'}
            </Typography>
            <Typography>Priority: {prevTicket.priority}</Typography>
            <Typography>Status: {prevTicket.status}</Typography>
          </AccordionDetails>
        </Box>
      ))}
    </Accordion>
  </Paper>
);

export default TicketHistory;
