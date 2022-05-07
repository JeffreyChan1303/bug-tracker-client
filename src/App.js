import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Drawer, CssBaseline, Box} from '@mui/material';
import { useDispatch } from 'react-redux';

import { Header, Navbar, Dashboard, AddProject, AllProjects, EditProject, MyProjects, ProjectArchive, ProjectDetails, AddTicket, AllTickets, EditTicket, MyTickets, TicketArchive, TicketDetails } from './components';


const drawerWidth = 260;

const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
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
            {/* <Box> */}
                <Routes>
                    {/* <Route exact path="" element={<Dashboard drawerWidth={drawerWidth} />}/> */}
                    <Route exact path="/" element={<Dashboard drawerWidth={drawerWidth} />}/>

                    <Route exact path="/allProjects" element={<AllProjects drawerWidth={drawerWidth} />}/>
                    <Route exact path="/myProjects" element={<MyProjects drawerWidth={drawerWidth} />}/>
                    <Route exact path="/addProject" element={<AddProject drawerWidth={drawerWidth} />}/>
                    <Route exact path="/projectArchive" element={<ProjectArchive drawerWidth={drawerWidth} />}/>
                    <Route exact path="/editProject" element={<EditProject drawerWidth={drawerWidth} />}/>
                    <Route exact path="/projectDetails" element={<ProjectDetails drawerWidth={drawerWidth} />}/>

                    <Route exact path="/allTickets" element={<AllTickets drawerWidth={drawerWidth} />} />
                    <Route exact path="/myTickets" element={<MyTickets drawerWidth={drawerWidth} />} />
                    <Route exact path="/addTicket" element={<AddTicket drawerWidth={drawerWidth} />} />
                    <Route exact path="/ticketArchive" element={<TicketArchive drawerWidth={drawerWidth} />} />
                    <Route exact path="/editTicket" element={<EditTicket drawerWidth={drawerWidth} />} />
                    <Route exact path="/ticketDetails" element={<TicketDetails drawerWidth={drawerWidth} />} />

                </Routes>
            {/* </Box> */}

            {/* <Dashboard drawerWidth={drawerWidth} /> */}
        </Box>
    )
}

export default App;