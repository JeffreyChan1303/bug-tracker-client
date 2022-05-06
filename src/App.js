import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Drawer, CssBaseline, Box} from '@mui/material';

import { Navbar, Header, Dashboard, Projects, Tickets} from './components';


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
                    {/* <Route exact path="/" element={} /> */}
                </Routes>
            {/* </Box> */}

            {/* <Dashboard drawerWidth={drawerWidth} /> */}
        </Box>
    )
}

export default App;