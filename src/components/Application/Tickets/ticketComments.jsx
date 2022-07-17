import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Paper,
  Grid,
  Button,
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
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  getTicketDetails,
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

const TicketComments = ({ ticketId, getDateFromISODate }) => {
  const [comment, setComment] = useState('');
  const [commentsSearch, setCommentsSearch] = useState('');
  const [commentsCurrentPage, setCommentsCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [commentsItemsPerPage, setCommentsItemsPerPage] = useState(5);
  const dispatch = useDispatch();

  const {
    ticket,
    ticket: { commentsNumberOfPages },
  } = useSelector((state) => state.ticketDetails);

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

  // WE NEED TO PUT THIS USER OBJECT IN A REDUX GLOBAL STATE. this will make retrieving some user information a lot easier
  const userName = JSON.parse(localStorage.getItem('profile'))?.userObject?.name;

  const handleSaveComment = () => {
    const ticketComment = comment.trim();
    if (ticketComment && ticket.status !== 'Archived') {
      dispatch(addTicketComment({ ticketId, comment: { name: userName, message: ticketComment } }));
      dispatch(getTicketDetails(ticketId));
      setComment('');
    } else if (ticket.status === 'Archived') {
      dispatch(handleAlerts({ severity: 'warning', message: 'Cannot comment on archived ticket' }));
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

  return (
    <>
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
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
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
          {ticket.status === 'Archived' ? (
            <Button variant="outlined" onClick={handleSaveComment} disabled>
              Save Comment
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleSaveComment}>
              Save Comment
            </Button>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default TicketComments;
