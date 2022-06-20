import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Drawer, CssBaseline, Box, Toolbar } from '@mui/material';

import { Header, Navbar, Dashboard, AddProject, AllProjects, EditProject, MyProjects, ProjectArchive, ProjectDetails, AddTicket, AllTickets, EditTicket, MyTickets, TicketArchive, TicketDetails } from './Application/index';
import CrudAlert from './Application/CrudFeedback/crudAlert';


const drawerWidth = 260;


const Application = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header handleDrawerToggle={handleDrawerToggle} />
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                    aria-label="navigation drawer"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                        <Navbar />
                    </Drawer>

                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' }, // hides in mobile view
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        <Navbar />
                    </Drawer>
                </Box>

                {/* Here is the content and the routes */}
                <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
                    <Toolbar />
                        <Routes>
                            <Route exact path="/*" element={<Navigate to="/dashboard" replace />} />
                            <Route exact path="/dashboard" element={<Dashboard />} />

                            {/* Project Routes */}
                            <Route exact path="/allProjects" element={<AllProjects />} />
                            <Route exact path="/allProjects/search" element={<AllProjects />} />

                            <Route exact path="/myProjects" element={<MyProjects />} />
                            <Route exact path="/addProject" element={<AddProject />} />
                            <Route exact path="/projectArchive" element={<ProjectArchive />} />
                            <Route exact path="/editProject" element={<EditProject />} />
                            <Route exact path="/projectDetails" element={<ProjectDetails />} />


                            {/* Ticket Routes */}
                            <Route exact path="/allTickets" element={<AllTickets />} />
                            <Route exact path="/allTickets/search" element={<AllTickets />} />

                            <Route exact path="/myTickets" element={<MyTickets />} />
                            <Route exact path="/myTickets/search" element={<MyTickets />} />

                            <Route exact path="/ticketArchive" element={<TicketArchive />} />
                            <Route exact path="/ticketArchive/search" element={<TicketArchive />} />

                            <Route exact path="/addTicket" element={<AddTicket />} />
                            <Route exact path="/editTicket/:id" element={<EditTicket />} />
                            <Route exact path="/ticketDetails/:id" element={<TicketDetails />} />

                        </Routes>
                </Box>
            </Box>

            {/* Notifications */}

            <CrudAlert />
        </>
    )
}

export default Application;