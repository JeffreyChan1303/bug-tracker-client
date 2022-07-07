import React from 'react';
import { Typography, Grid, Card, Box, Avatar } from '@mui/material';

const Dashboard = () => {

    return (
        <>
            <Typography variant="h4">
                Dashboard
            </Typography>

            <Grid container spacing={2}>
                {/* Active Projects card */}
                <Grid item xs={12} md={6} lg={3} >
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
                                <Avatar sx={{ bgcolor: "primary.light" }} />
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
                <Grid item xs={12} md={6} lg={3} >
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
                                <Avatar />
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
                <Grid item xs={12} md={6} lg={3} >
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
                                <Avatar />
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
                <Grid item xs={12} md={6} lg={3} >
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
                                <Avatar />
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
        </>
    )
};

export default Dashboard;