import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Application from './components/application';
import Login from './components/Login/login';


const App = () => {

    return (
        <Routes>
            <Route path="/*" element={<Application />} />
            <Route exact path="/auth" element={<Login />} />
        </Routes>
    )
}

export default App;