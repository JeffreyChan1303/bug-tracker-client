import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Grid,
  TableCell,
  IconButton,
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserNotificationsBySearch,
  deleteUserNotification,
  readNotification,
  readAllNotifications,
} from '../../services/user/notificationsSlice';
import CustomPagination from './pagination';

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

const getDateFromISODate = (ISODate) => {
  const date = new Date(ISODate);
  // prettier-ignore
  const string = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return string;
};

const NotificationPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const page = query.get('page');
  const {
    getUserNotificationsBySearch: { loading },
    notifications,
    currentPage,
    numberOfPages,
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getUserNotificationsBySearch({ search, page }));
  }, [page]);

  const handleDeleteNotification = (createdAt) => {
    // we will just use an array method and shift from the bottom for now!!!
    // we wil need to implement specific ids for the notifications soon though
    dispatch(deleteUserNotification({ createdAt }));
    window.location.reload();
  };

  const searchAllNotifications = () => {
    if (search.trim()) {
      dispatch(getUserNotificationsBySearch({ search, page: 1 }));
      navigate(`/notifications/search?searchQuery=${search || 'none'}&page=1`);
    } else {
      navigate('/notifications');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchAllNotifications();
    }
  };

  const handleRead = (createdAt) => {
    dispatch(readNotification({ createdAt }));
  };

  const handleReadAll = async () => {
    await dispatch(readAllNotifications());
    dispatch(getUserNotificationsBySearch({ search, page }));
  };

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            All Notifications
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Button
              variant="outlined"
              onClick={handleReadAll}
              sx={{ mr: '20px', textTransform: 'none' }}
            >
              <Typography variant="body2">Read all notifications</Typography>
            </Button>
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
        <Table sx={{ minWidth: '650px' }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <BoldedTableCell>Title</BoldedTableCell>
              <BoldedTableCell align="right">Created At</BoldedTableCell>
              <BoldedTableCell align="center">Delete</BoldedTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications &&
              notifications.map((notification) => (
                <TableRow
                  key={notification.createdAt}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <ContentTableCell component="th" scope="row">
                    <Accordion
                      elevation={0}
                      disableGutters
                      onChange={() => handleRead(notification.createdAt)}
                    >
                      <AccordionSummary
                        sx={{
                          '&.MuiAccordionSummary': { m: 0 },
                          '&:hover': {
                            bgcolor: 'grey.300',
                          },
                        }}
                        expandIcon={<ExpandMoreIcon />}
                      >
                        {!notification.isRead ? (
                          <Badge color="error" variant="dot">
                            <Typography variant="body1" marginRight={1}>
                              {notification.title}
                            </Typography>
                          </Badge>
                        ) : (
                          <Typography variant="body1" marginRight={1}>
                            {notification.title}
                          </Typography>
                        )}
                      </AccordionSummary>

                      <AccordionDetails key={notification.createdAt}>
                        <Typography variant="body1" fontWeight={700}>
                          {notification.description}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </ContentTableCell>

                  <ContentTableCell align="right">
                    {getDateFromISODate(notification.createdAt)}
                  </ContentTableCell>
                  <ContentTableCell align="center">
                    <Tooltip title="Delete" disableInteractive>
                      <IconButton onClick={() => handleDeleteNotification(notification.createdAt)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ContentTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <CustomPagination
        path={`/notifications${search.trim() ? `/search?searchQuery=${search}&` : `?`}`}
        page={page}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Paper>
  );
};

export default NotificationPage;
