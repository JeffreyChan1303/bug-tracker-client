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
  Chip,
  Tooltip,
  IconButton,
  Pagination,
  PaginationItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddIcon from '@mui/icons-material/Add';
import {
  getProjectTickets,
  searchProjectTickets,
} from '../../../services/project/projectDetailsSlice';
import { getDateFromISODate } from '../../Utility/formatDate';
import { BoldedTableCell, ContentTableCell } from '../../Utility/tableCellStyles';

const ProjectTickets = ({ handleSelectTicket }) => {
  const { projectId } = useParams();
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
    showArchived: false,
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
        showArchived: assignedTickets.showArchived,
      })
    );
  }, [assignedTickets, projectTickets.original]);

  const handleAssignedTicketsPageChange = (page) => {
    setAssignedTickets({ ...assignedTickets, currentPage: page });
  };

  const handleToggleShowArchived = () => {
    console.log('test');
    setAssignedTickets({ ...assignedTickets, showArchived: !assignedTickets.showArchived });
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            Project Tickets
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Typography align="right" variant="body1">
              Search:&nbsp;
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
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
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
                    <Tooltip title="View" disableInteractive>
                      <IconButton onClick={() => navigate(`/ticketDetails/${ticket?._id}`)}>
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    {handleSelectTicket && (
                      <Tooltip title="Select Ticket" disableInteractive>
                        <IconButton
                          onClick={() =>
                            handleSelectTicket({ _id: ticket._id, title: ticket.title })
                          }
                        >
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

      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={assignedTickets.showArchived}
            onClick={handleToggleShowArchived}
          />
        }
        label={<Typography variant="body2">show archived?</Typography>}
      />

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
