import react, { useEffect } from 'react'
import { Typography, CircularProgress, Button } from '@mui/material';


import { useDispatch, useSelector } from 'react-redux';
import { getUserNotifications, createUsersNotification, deleteUserNotification } from '../../services/user/notificationsSlice';

const NotificationPage = () => {
    const dispatch = useDispatch();
    const { loading, notifications } = useSelector(state => state.notifications);

    useEffect(() => {
        dispatch(getUserNotifications());
    }, [])


    const handleCreateNotification = () => {
        // just for testing
        const { _id } = JSON.parse(localStorage.getItem('profile')).userObject;
        dispatch(createUsersNotification({
            users: [_id],
            title: 'notification has been created',
            description: 'Test Message',
        }))
    }
    const handleDeleteNotification = () => {
        // we will just use an array method and shift from the bottom for now!!! 
        // we wil need to implement specific ids for the notifications soon though
        dispatch(deleteUserNotification())
    }

    return (
        loading ? <CircularProgress color="inherit"/> :
        <>
            <Typography variant="body1">Notifications Page</Typography>
            <Button variant="outlined" onClick={() => handleCreateNotification()}>Create Notification</Button>
            <Button variant="outlined" onClick={() => handleDeleteNotification()}>Delete Notification</Button>
        </>
    )
}

export default NotificationPage;