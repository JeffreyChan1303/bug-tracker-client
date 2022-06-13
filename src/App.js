import React, { useState, useEffect } from 'react';

import Application from './components/application';
import Auth from './components/Auth/auth';


const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user)


    if (user) {
        // console.log("there is a user in local storage")
        // navigate('/');
    } else {
        // console.log("there is no user in local storage")
        // navigate('/auth');
    }
    /*
        if we have a user, navigate to path, if we dont have a user, navigate to auth!!!
        User should be stored in Redux!!
    */



    return (
        // <Routes>
        //     <Route path="/*" element={<Application />} />
        //     <Route exact path="/Auth" element={<Auth />} />
        // </Routes>
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