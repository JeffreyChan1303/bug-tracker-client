import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Application from './components/application';
import Auth from './components/Auth/auth';


const App = () => {
    /*
        if we have a user, navigate to path, if we dont have a user, navigate to auth!!!
        User should be stored in Redux!!
    */

    return (
        <Routes>
            <Route path="/*" element={<Application />} />
            <Route exact path="/Auth" element={<Auth />} />
        </Routes>
    )
}

export default App;