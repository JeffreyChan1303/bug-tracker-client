import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../services/alertsSlice';
import { createUsersNotification } from '../../../services/user/notificationsSlice';

const AllSupportTickets = () => {
  const dispatch = useDispatch();

  const handleTest = () => {
    dispatch(addAlert({ severity: 'warning', message: 'sdfgsdf' }));
  };

  const handleCreateNotification = () => {
    // just for testing
    const { _id } = JSON.parse(localStorage.getItem('profile')).userObject;
    dispatch(
      createUsersNotification({
        users: [_id],
        title: 'notification has been created',
        description: 'Test Message',
      })
    );
  };

  return (
    <>
      Send a support Ticket here!!
      <Button variant="outlined" onClick={handleTest}>
        handleTest
      </Button>
      <Button variant="outlined" onClick={() => handleCreateNotification()}>
        Create Notification
      </Button>
    </>
  );
};

export default AllSupportTickets;
