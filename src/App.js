import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Typography, Grid, CssBaseline } from '@mui/material';

import { Navbar, Header, Dashboard, Projects, Tickets} from './components';

const App = () => {
    return (
        <CssBaseline>
        <Grid container direction="row">
            <Grid item sm={3} md={2}>
                <Navbar />
            </Grid>
            <Grid item sm={9} md={10}>
                <Header />
                <Container >
                    {/* Place holder for all the routes */}
                    this is the container
                </Container>
            </Grid>
        </Grid>
        </CssBaseline>
    )
}

export default App;