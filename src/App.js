import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';

import { Navbar, Header, Dashboard, Projects, Tickets} from './components';

const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="header">
                <Header />
            </div>
            <div className="main">
                <Container >
                    {/* Place holder for all the routes */}
                </Container>
            </div>
        </div>
    )
}

export default App;