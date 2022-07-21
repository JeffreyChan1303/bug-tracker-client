import React from 'react';
import { Table, TableHead, TableRow, TableBody, IconButton, Tooltip, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import RestoreIcon from '@mui/icons-material/Restore';

import { getDateFromISODate } from '../../Utility/formatDate';
import { BoldedTableCell, ContentTableCell } from '../../Utility/tableCellStyles';

const TicketTable = ({ tickets, ticketDetails, editTicket, handleClaimTicket, handleRestoreTicket }) => {
  const navigate = useNavigate();

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <BoldedTableCell>Title</BoldedTableCell>
          <BoldedTableCell sx={{ fontWeight: 600 }} align="right">
            Submitted By
          </BoldedTableCell>
          <BoldedTableCell align="right">Developer</BoldedTableCell>
          <BoldedTableCell align="center">Status</BoldedTableCell>
          <BoldedTableCell align="center">Priority</BoldedTableCell>
          <BoldedTableCell align="center">Type</BoldedTableCell>
          <BoldedTableCell align="center">Last Updated</BoldedTableCell>
          <BoldedTableCell align="center">Actions</BoldedTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets &&
          tickets.map((ticket) => (
            <TableRow key={ticket._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <ContentTableCell component="th" scope="row">
                {ticket.title}
              </ContentTableCell>
              <ContentTableCell align="right">{ticket.name}</ContentTableCell>
              <ContentTableCell align="right">
                {ticket.developer?.name ? ticket.developer.name : '(None)'}
              </ContentTableCell>
              <ContentTableCell align="center">
                <Chip label={ticket.status} variant="outlined" color="secondary" />
              </ContentTableCell>
              <ContentTableCell align="center">
                <Chip label={ticket.priority} variant="outlined" color="secondary" />
              </ContentTableCell>
              <ContentTableCell align="center">
                <Chip label={ticket.type} variant="outlined" color="secondary" />
              </ContentTableCell>
              <ContentTableCell align="center">{getDateFromISODate(ticket.updatedAt)}</ContentTableCell>

              <ContentTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                {handleClaimTicket && (
                  <Tooltip title="Claim Ticket" disableInteractive>
                    <IconButton onClick={() => handleClaimTicket(ticket._id)}>
                      <PanToolOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {ticketDetails && (
                  <Tooltip title="View" disableInteractive>
                    <IconButton onClick={() => navigate(`/ticketDetails/${ticket._id}`)}>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {editTicket && (
                  <Tooltip title="Edit" disableInteractive>
                    <IconButton onClick={() => navigate(`/editTicket/${ticket._id}`)}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {handleRestoreTicket && (
                  <Tooltip title="Restore" disableInteractive>
                    <IconButton onClick={() => handleRestoreTicket(ticket._id)}>
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </ContentTableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TicketTable;
