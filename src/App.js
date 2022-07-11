import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Drawer, CssBaseline, Box, Toolbar } from '@mui/material';
import { useLocation } from 'react-router-dom'

import { Header, Navbar, Dashboard, AddProject, AllProjects, EditProject, MyProjects, ProjectArchive, ProjectDetails, AddTicket, AllTickets, EditTicket, MyTickets, TicketArchive, TicketDetails, ManageUserRoles, NotificationsPage, Support, UnassignedTickets, AssignTickets } from './components/Application/index';
import { userActions } from './services/user/userSlice';
import { handleAlerts } from './services/alertsSlice';
import decode from 'jwt-decode';
import Alert from './components/Application/alert';
import Auth from './components/Auth/auth';


const drawerWidth = 260;


const App = () => {
    // maybe make the alerts in the file so it always shows even on the auth page,
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const { authData } = useSelector((state) => state.user)
    console.log(authData)

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogOut = () => {
        dispatch(userActions.logout())
    }

    // this is the guard for a user that doesn't have a valid token while on the app.
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            console.log(decodedToken)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch(handleAlerts({ severity: 'info', message: 'Your login session has expired. Please login again.'}));
                handleLogOut();
            }
        }
    }, [location])

    return (
        <>
            {!user? (
                <Auth />
            ) : (
                <>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <Header 
                            handleDrawerToggle={handleDrawerToggle} 
                            drawerWidth={drawerWidth}
                            user={user}
                            handleLogOut={handleLogOut}
                        />
                        
                        <Box
                            component="nav"
                            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                            aria-label="navigation drawer"
                        >
                            <Drawer
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                            >
                                <Navbar user={user} />
                            </Drawer>

                            <Drawer
                                variant="permanent"
                                sx={{
                                    display: { xs: 'none', md: 'block' }, // hides in mobile view
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                                open
                            >
                                <Navbar user={user} />
                            </Drawer>
                        </Box>

                        {/* Here is the content and the routes */}
                        <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
                            <Toolbar />
                                <Routes>
                                    <Route exact path="/*" element={<Navigate to="/dashboard" replace />} />
                                    <Route exact path="/dashboard" element={<Dashboard />} />
                                    <Route exact path="/support" element={<Support />} />
                                    

                                    {/* Project Routes */}
                                    <Route exact path="/allProjects" element={<AllProjects />} />
                                    <Route exact path="/allProjects/search" element={<AllProjects />} />

                                    <Route exact path="/myProjects" element={<MyProjects />} />
                                    <Route exact path="/myProjects/search" element={<MyProjects />} />

                                    <Route exact path="/projectArchive" element={<ProjectArchive />} />
                                    <Route exact path="/projectArchive/search" element={<ProjectArchive />} />

                                    <Route exact path="/addProject" element={<AddProject />} />
                                    <Route exact path="/editProject/:id" element={<EditProject />} />
                                    <Route exact path="/projectDetails/:projectId" element={<ProjectDetails />} />

                                    <Route exact path="/projectDetails/manageUserRoles/:id" element={<ManageUserRoles />} />
                                    <Route exact path="/projectDetails/manageUserRoles/:id/search" element={<ManageUserRoles />} />

                                    <Route exact path="/projectDetails/assignTickets/:projectId" element={<AssignTickets />} />


                                    {/* Ticket Routes */}
                                    <Route exact path="/allTickets" element={<AllTickets />} />
                                    <Route exact path="/allTickets/search" element={<AllTickets />} />

                                    <Route exact path="/myTickets" element={<MyTickets />} />

                                    <Route exact path="/unassignedTickets" element={<UnassignedTickets />} />

                                    <Route exact path="/ticketArchive" element={<TicketArchive />} />
                                    <Route exact path="/ticketArchive/search" element={<TicketArchive />} />

                                    <Route exact path="/addTicket" element={<AddTicket />} />
                                    <Route exact path="/editTicket/:ticketId" element={<EditTicket />} />
                                    <Route exact path="/ticketDetails/:ticketId" element={<TicketDetails />} />

                                    {/* User Routes */}

                                    <Route exact path="/notifications" element={<NotificationsPage />} />
                                    <Route exact path="/notifications/search" element={<NotificationsPage />} />

                                </Routes>
                        </Box>
                    </Box>
                </>
            )}

            {/* Alerts */}
            <Alert />
        </>
    )
}

export default App;