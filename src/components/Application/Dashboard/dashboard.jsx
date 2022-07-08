import React from 'react';
import { Typography, Grid, Card, Box, Avatar, Paper } from '@mui/material';

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BugReportIcon from '@mui/icons-material/BugReport';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import MyTickets from '../Tickets/myTickets';
import DashboardCharts from './dashboardCharts';


const Dashboard = () => {

    
    return (
        <>
            <Typography variant="h4">
                Dashboard
            </Typography>

            <Grid container spacing={2}>
                {/* Active Projects card */}
                <Grid item xs={12} sm={6} lg={3} >
                    <Card elevation={1} sx={{ p: 3 }}  >
                        <Grid container justifyContent="space-between">
                            <Grid item >
                                <Typography variant="body1">
                                    Active Projects
                                </Typography>
                                <Typography variant="h6">
                                    (number)
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
                                    Total Tickets
                                </Typography>
                                <Typography variant="h6">
                                    (number)
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


            {/* Charts */}
            <DashboardCharts />

            <Box sx={{ mt: 2 }} >
                {/* Put a property for pagination so we can input wheather we want pagination or not on this component */}
                <MyTickets />
            </Box>
        </>
    )
};

export default Dashboard;