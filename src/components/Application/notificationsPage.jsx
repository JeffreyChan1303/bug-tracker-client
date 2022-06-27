import react, { useEffect } from 'react'
import { Typography, CircularProgress } from '@mui/material';


import { useDispatch, useSelector } from 'react-redux';
import { getUserNotifications } from '../../services/user/notificationsSlice';

const NotificationPage = () => {
    const dispatch = useDispatch();
    const { loading, notifications } = useSelector(state => state.notifications);

    useEffect(() => {
        dispatch(getUserNotifications(JSON.parse(localStorage.getItem('profile')).userObject._id));
    }, [])

    return (
        loading ? <CircularProgress color="inherit"/> :
        <>
            <Typography variant="body1">Notifications Page</Typography>
        </>
    )
}

export default NotificationPage;