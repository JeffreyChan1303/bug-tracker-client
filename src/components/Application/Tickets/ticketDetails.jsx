import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  IconButton,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getTicketDetails,
  moveTicketToArchive,
  deleteTicketFromArchive,
  restoreTicketFromArchive,
  addTicketComment,
  deleteTicketComment,
  searchTicketComments,
} from '../../../services/ticket/ticketDetailsSlice';
import { handleAlerts } from '../../../services/alertsSlice';

const BoldedTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  padding: '8px 5px',
}));

const ContentTableCell = styled(TableCell)(() => ({
  padding: '5px',
}));

const getDateFromISODate = (ISODate) => {
  const date = new Date(ISODate);
  const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  return string;
};

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [comment, setComment] = useState('');
  const [commentsSearch, setCommentsSearch] = useState('');
  const [commentsCurrentPage, setCommentsCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [commentsItemsPerPage, setCommentsItemsPerPage] = useState(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getTicketDetails: { loading },
    ticket,
    ticket: { ticketHistory, commentsNumberOfPages },
  } = useSelector((state) => state.ticketDetails);

  useEffect(() => {
    dispatch(getTicketDetails(ticketId));
  }, []);

  useEffect(() => {
    // this searches based on searchquery, currentPage, and the number of entries per page
    dispatch(
      searchTicketComments({
        searchQuery: commentsSearch,
        commentsCurrentPage,
        commentsItemsPerPage,
      })
    );
  }, [commentsSearch, commentsCurrentPage, commentsItemsPerPage, ticket.comments]);

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

  // WE NEED TO PUT THIS USER OBJECT IN A REDUX GLOBAL STATE. this will make retrieving some user information a lot easier
  const userName = JSON.parse(localStorage.getItem('profile'))?.userObject?.name;

  const handleSaveComment = () => {
    const ticketComment = comment.trim();
    if (ticketComment) {
      dispatch(addTicketComment({ ticketId, comment: { name: userName, message: ticketComment } }));
      dispatch(getTicketDetails(ticketId));
      setComment('');
    } else {
      dispatch(handleAlerts({ severity: 'warning', message: 'Invalid Comment' }));
    }
  };
  const handleAddCommentKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSaveComment();
    }
  };

  const handleDeleteComment = (commentCreatedAt) => {
    dispatch(deleteTicketComment({ ticketId, commentCreatedAt }));
    dispatch(getTicketDetails(ticketId));
  };

  const handleCommentPageChange = (page) => {
    setCommentsCurrentPage(page);
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
        <Paper sx={{ p: 3 }} elevation={3}>
          <Box sx={{ overflowX: 'scroll' }}>
            <Grid container justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Ticket Comments
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Typography align="right" variant="body1">
                  {' '}
                  Search:&nbsp;{' '}
                </Typography>
                <TextField
                  size="small"
                  variant="standard"
                  name="search"
                  value={commentsSearch}
                  onChange={(e) => setCommentsSearch(e.target.value)}
                />
              </Box>
            </Grid>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <BoldedTableCell>User</BoldedTableCell>
                  <BoldedTableCell align="left">Message</BoldedTableCell>
                  <BoldedTableCell align="left">Created</BoldedTableCell>
                  <BoldedTableCell align="center">Delete</BoldedTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticket.searchedComments?.map((ticketComment) => (
                  <TableRow
                    key={ticketComment.createdAt}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <ContentTableCell component="th" scope="row">
                      {ticketComment.name}
                    </ContentTableCell>
                    <ContentTableCell align="left">{ticketComment.message}</ContentTableCell>
                    <ContentTableCell align="left">
                      {getDateFromISODate(ticketComment.createdAt)}
                    </ContentTableCell>
                    <ContentTableCell align="center">
                      <IconButton onClick={() => handleDeleteComment(ticketComment.createdAt)}>
                        <DeleteIcon />
                      </IconButton>
                    </ContentTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Pagination
            sx={{ ul: { justifyContent: 'space-around' }, mt: '20px' }}
            count={commentsNumberOfPages}
            page={commentsCurrentPage}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Button}
                onClick={() => handleCommentPageChange(item.page)}
              />
            )}
          />
        </Paper>

        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography fontWeight={700} variant="body1" align="center" marginBottom={1}>
            Add a comment?
          </Typography>
          <Grid container justifyContent="space-evenly">
            <Grid item xs={8}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleAddCommentKeyPress}
              />
            </Grid>
            <Button variant="outlined" onClick={handleSaveComment}>
              Save Comment
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TicketDetails;
