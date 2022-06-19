import React, { useState, useEffect } from 'react';

import Application from './components/application';
import Auth from './components/Auth/auth';


const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
        <>
            {user? (
                <Application />
            ) : (
                <Auth />
            )}
        </>
    )
}

export default App;