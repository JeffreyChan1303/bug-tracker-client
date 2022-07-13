import React from 'react';
import { Typography, Grid, Box } from '@mui/material';

const TicketInformation = ({ ticket, getDateFromISODate }) => (
  <Grid container>
    <Grid item xs={5}>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Title
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.title}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Developer
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.developer?.name ? ticket.developer.name : 'none'}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Project
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.project?.title}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Ticket Status
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.status}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Created
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {getDateFromISODate(ticket.createdAt)}
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={7}>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Description
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.description}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Created By
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.name}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Ticket Priority
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.priority}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Ticket Type
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {ticket.type}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Updated
        </Typography>
        <Typography paddingLeft={1} variant="body1">
          {getDateFromISODate(ticket.updatedAt)}
        </Typography>
      </Box>
    </Grid>
  </Grid>
);

export default TicketInformation;
