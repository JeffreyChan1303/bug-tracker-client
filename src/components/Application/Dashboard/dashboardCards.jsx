import React, { useEffect } from 'react';
import { Typography, Grid, Card, Box, Avatar, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getActiveProjects, getActiveTickets, getUnassignedTickets, getUnreadNotifications } from '../../../services/dashboardSlice';

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BugReportIcon from '@mui/icons-material/BugReport';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';




const DashboardCards = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveProjects());
        dispatch(getActiveTickets());
        dispatch(getUnassignedTickets());
        dispatch(getUnreadNotifications());
    }, [])
    const { getActiveProjects: activeProjects,
            getActiveTickets: activeTickets,
            getUnassignedTickets: unassignedTickets,
            getUnreadNotifications: unreadNotifications } = useSelector((state) => state.dashboard);

    

    return (
        <Grid container spacing={2}>
            {/* Active Projects card */}
            <Grid item xs={12} sm={6} lg={3} >
                <Card elevation={1} sx={{ p: 3 }}  >
                    <Grid container justifyContent="space-between">
                        <Grid item >
                            <Typography variant="body1">
                                Active Projects
                            </Typography>
                            <Typography variant="h6" fontWeight={700}>
                                aa
                                {activeProjects.loading ? <CircularProgress color='inherit' /> : activeProjects?.data}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Avatar sx={{ bgcolor: "primary.light" }} >
                                <FolderOpenOutlinedIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Box >
                        <Typography variant="caption" >
                            this is just the bottom of the card
                        </Typography>
                    </Box>
                </Card>
            </Grid>

            {/* Total tickets card */}
            <Grid item xs={12} sm={6} lg={3} >
                <Card elevation={1} sx={{ p: 3 }}  >
                    <Grid container justifyContent="space-between">
                        <Grid item >
                            <Typography variant="body1">
                                Active Tickets
                            </Typography>
                            <Typography variant="h6">
                                (number)
                                {activeTickets.loading ? <CircularProgress color="inherit" /> : activeTickets?.data}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Avatar sx={{ bgcolor: "primary.light" }} >
                                <ConfirmationNumberIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Box >
                        <Typography variant="caption" >
                            this is just the bottom of the card
                        </Typography>
                    </Box>
                </Card>
            </Grid>

            {/* Unassigned Tickets Card */}
            <Grid item xs={12} sm={6} lg={3} >
                <Card elevation={1} sx={{ p: 3 }}  >
                    <Grid container justifyContent="space-between">
                        <Grid item >
                            <Typography variant="body1">
                                Unassigned Tickets
                            </Typography>
                            <Typography variant="h6">
                                (number)
                                {unassignedTickets.loading ? <CircularProgress color="inherit" /> : unassignedTickets?.data}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Avatar sx={{ bgcolor: "primary.light" }}>
                                <BugReportIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Box >
                        <Typography variant="caption" >
                            this is just the bottom of the card
                        </Typography>
                    </Box>
                </Card>
            </Grid>

            {/* Unread Notifications card */}
            <Grid item xs={12} sm={6} lg={3} >
                <Card elevation={1} sx={{ p: 3 }}  >
                    <Grid container justifyContent="space-between">
                        <Grid item >
                            <Typography variant="body1">
                                Unread Notifications
                            </Typography>
                            <Typography variant="h6">
                                (number)
                                {unreadNotifications.loading ? <CircularProgress color="inherit" /> : unreadNotifications?.data}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Avatar sx={{ bgcolor: "primary.light" }} >
                                <NotificationsActiveOutlinedIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Box >
                        <Typography variant="caption" >
                            this is just the bottom of the card
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}

export default DashboardCards;