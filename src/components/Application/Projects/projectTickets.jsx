import React, { useEffect, useState } from 'react';

import {
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Tooltip,
  IconButton,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddIcon from '@mui/icons-material/Add';
import {
  getProjectTickets,
  searchProjectTickets,
} from '../../../services/project/projectDetailsSlice';

const BoldedTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  padding: '8px 5px',
}));

const ContentTableCell = styled(TableCell)(() => ({
  padding: '5px',
}));

const getDateFromISODate = (ISODate) => {
  const date = new Date(ISODate);
  const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
  return string;
};

const ProjectTickets = ({ projectId, handleSelectTicket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    projectTickets,
    getProjectTickets: { loading },
  } = useSelector((state) => state.projectDetails);

  const [assignedTickets, setAssignedTickets] = useState({
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 5,
  });

  useEffect(() => {
    dispatch(getProjectTickets(projectId));
  }, []);

  useEffect(() => {
    dispatch(
      searchProjectTickets({
        searchQuery: assignedTickets.searchQuery,
        currentPage: assignedTickets.currentPage,
        itemsPerPage: assignedTickets.itemsPerPage,
      })
    );
  }, [assignedTickets, projectTickets.original]);

  const handleAssignedTicketsPageChange = (page) => {
    setAssignedTickets({ ...assignedTickets, currentPage: page });
  };
  return loading ? (
    <CircularProgress />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            {' '}
            Project Tickets{' '}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Typography align="right" variant="body1">
              {' '}
              Search:&nbsp;{' '}
            </Typography>
            <TextField
              size="small"
              variant="standard"
              name="Tickets search query"
              value={assignedTickets.searchQuery}
              onChange={(e) =>
                setAssignedTickets({ ...assignedTickets, searchQuery: e.target.value })
              }
            />
          </Box>
        </Grid>
        <Table sx={{}} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <BoldedTableCell>Title</BoldedTableCell>
              <BoldedTableCell align="left">Submitted By</BoldedTableCell>
              <BoldedTableCell align="left">Developer</BoldedTableCell>
              <BoldedTableCell align="left">Status</BoldedTableCell>
              <BoldedTableCell align="left">Updated At</BoldedTableCell>
              <BoldedTableCell align="center">Actions</BoldedTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectTickets.searched &&
              projectTickets.searched.map((ticket) => (
                <TableRow
                  key={ticket._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <ContentTableCell>{ticket?.title}</ContentTableCell>
                  <ContentTableCell align="left">{ticket?.name}</ContentTableCell>
                  <ContentTableCell align="left">
                    {ticket?.developer?.name ? ticket.developer.name : '(None)'}
                  </ContentTableCell>
                  <ContentTableCell align="left">
                    <Chip label={ticket?.status} variant="outlined" color="secondary" />
                  </ContentTableCell>
                  <ContentTableCell align="left">
                    {getDateFromISODate(ticket?.updatedAt)}
                  </ContentTableCell>
                  <ContentTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="View">
                      <IconButton onClick={() => navigate(`/ticketDetails/${ticket?._id}`)}>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    {handleSelectTicket && (
                      <Tooltip title="Select Ticket">
                        <IconButton
                          onClick={() =>
                            handleSelectTicket({ _id: ticket._id, title: ticket.title })
                          }>
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ContentTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <Pagination
        sx={{ ul: { justifyContent: 'space-around' }, mt: '20px' }}
        count={projectTickets.numberOfPages}
        page={assignedTickets.currentPage}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Button}
            onClick={() => handleAssignedTicketsPageChange(item.page)}
          />
        )}
      />
    </Paper>
  );
};

export default ProjectTickets;
