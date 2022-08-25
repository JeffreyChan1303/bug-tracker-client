import React, { useEffect } from 'react';
import { Typography, Grid, Card, Box, Avatar, CircularProgress, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BugReportIcon from '@mui/icons-material/BugReport';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import { getActiveProjects, getActiveTickets } from '../../../services/dashboardSlice';
import { getUnassignedTickets } from '../../../services/ticket/unassignedTicketsSlice';

const StyledButton = styled(Button)(() => ({
  minWidth: '70%',
  textTransform: 'none',
}));

const DashboardCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getActiveProjects());
    dispatch(getActiveTickets());
    dispatch(getUnassignedTickets({}));
    // dispatch(getUnreadNotifications()); this call is initialized in the header of the app
  }, []);
  const {
    getActiveProjects: activeProjects,
    getActiveTickets: activeTickets,
    getUnreadNotifications: unreadNotifications,
  } = useSelector((state) => state.dashboard);
  const unassignedTickets = useSelector((state) => state.unassignedTickets);

  return (
    <Grid container spacing={2}>
      {/* Active Projects card */}
      <Grid item xs={12} sm={6} lg={3}>
        <Card elevation={2} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" fontWeight={500} sx={{ color: 'grey.800' }}>
                Active Projects
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {activeProjects.loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  activeProjects?.data
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <FolderOpenOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            {/* make this a styled component to shorten the properties */}
            <StyledButton
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/myProjects')}
            >
              <Typography variant="caption">View active projects</Typography>
            </StyledButton>
          </Box>
        </Card>
      </Grid>

      {/* Total tickets card */}
      <Grid item xs={12} sm={6} lg={3}>
        <Card elevation={2} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" fontWeight={500} sx={{ color: 'grey.800' }}>
                Active Tickets
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {activeTickets.loading ? <CircularProgress color="inherit" /> : activeTickets?.data}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <ConfirmationNumberIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            <StyledButton
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/myTickets')}
            >
              <Typography variant="caption">View active tickets</Typography>
            </StyledButton>
          </Box>
        </Card>
      </Grid>

      {/* Unassigned Tickets Card */}
      <Grid item xs={12} sm={6} lg={3}>
        <Card elevation={2} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" fontWeight={500} sx={{ color: 'grey.800' }}>
                Unassigned Tickets
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {unassignedTickets.loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  unassignedTickets.numberOfTickets
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <BugReportIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            <StyledButton
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/unassignedTickets')}
            >
              <Typography variant="caption">View unassigned tickets</Typography>
            </StyledButton>
          </Box>
        </Card>
      </Grid>

      {/* Unread Notifications card */}
      <Grid item xs={12} sm={6} lg={3}>
        <Card elevation={2} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" fontWeight={500} sx={{ color: 'grey.800' }}>
                Unread Notifications
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {console.log(unreadNotifications.loading)}
                {unreadNotifications.loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  unreadNotifications.data
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <NotificationsActiveOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            <StyledButton
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/notifications')}
            >
              <Typography variant="caption">View notifications</Typography>
            </StyledButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
