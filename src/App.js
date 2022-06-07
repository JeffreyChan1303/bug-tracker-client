import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material'

import Application from './components/application';
import Auth from './components/Auth/auth';


const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user)


    if (user) {
        console.log("there is a user in local storage")
        // navigate('/');
    } else {
        console.log("there is no user in local storage")
        // navigate('/auth');
    }
    /*
        if we have a user, navigate to path, if we dont have a user, navigate to auth!!!
        User should be stored in Redux!!
    */

    /* global google */
    if(!google) {
        return (
            // <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
                // {/* <Toolbar /> */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            // </Box>
        )
    }


    return (
        // <Routes>
        //     <Route path="/*" element={<Application />} />
        //     <Route exact path="/Auth" element={<Auth />} />
        // </Routes>
        <>
            {user? (
                <Application />
            ) : (
                <>
                {google && <Auth />}
                </>
            )}
        </>
    )
}

export default App;