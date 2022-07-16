import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Tooltip,
  TextField,
  Chip,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { getAllTicketsBySearch } from '../../../services/ticket/allTicketsSlice';
import CustomPagination from '../pagination';
import { getDateFromISODate } from '../../Utility/dateUtility';

const BoldedTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  padding: '8px 5px',
}));

const ContentTableCell = styled(TableCell)(() => ({
  padding: '5px',
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllTickets = () => {
  const query = useQuery();
  const navigate = useNavigate();
  // const location = useLocation();
  const page = query.get('page');
  // const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const { loading, tickets, currentPage, numberOfPages } = useSelector((state) => state.allTickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTicketsBySearch({ search, page }));
  }, [page]);

  const searchAllTickets = () => {
    if (search.trim()) {
      dispatch(getAllTicketsBySearch({ search, page: 1 }));
      navigate(`/allTickets?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/allTickets');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchAllTickets();
    }
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            All Tickets
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Typography align="right" variant="body1">
              Search:&nbsp;
            </Typography>
            <TextField
              size="small"
              variant="standard"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </Box>
        </Grid>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <BoldedTableCell>Title</BoldedTableCell>
              <BoldedTableCell sx={{ fontWeight: 600 }} align="right">
                Submitted By
              </BoldedTableCell>
              <BoldedTableCell align="right">Developer</BoldedTableCell>
              <BoldedTableCell align="right">Status</BoldedTableCell>
              <BoldedTableCell align="right">Priority</BoldedTableCell>
              <BoldedTableCell align="right">Type</BoldedTableCell>
              <BoldedTableCell align="right">Last Updated</BoldedTableCell>
              <BoldedTableCell align="center">Actions</BoldedTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets &&
              tickets.map((ticket) => (
                <TableRow
                  key={ticket._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <ContentTableCell component="th" scope="row">
                    {ticket.title}
                  </ContentTableCell>
                  <ContentTableCell align="right">{ticket.name}</ContentTableCell>
                  <ContentTableCell align="right">
                    {ticket.developer?.name ? ticket.developer.name : '(None)'}
                  </ContentTableCell>
                  <ContentTableCell align="right">
                    <Chip label={ticket.status} variant="outlined" color="secondary" />
                  </ContentTableCell>
                  <ContentTableCell align="right">
                    <Chip label={ticket.priority} variant="outlined" color="secondary" />
                  </ContentTableCell>
                  <ContentTableCell align="right">
                    <Chip label={ticket.type} variant="outlined" color="secondary" />
                  </ContentTableCell>
                  <ContentTableCell align="right">
                    {getDateFromISODate(ticket.updatedAt)}
                  </ContentTableCell>
                  <ContentTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="View" disableInteractive>
                      <IconButton onClick={() => navigate(`/ticketDetails/${ticket._id}`)}>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" disableInteractive>
                      <IconButton onClick={() => navigate(`/editTicket/${ticket._id}`)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </ContentTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <CustomPagination
        path={`/allTickets${search.trim() ? `?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default AllTickets;
