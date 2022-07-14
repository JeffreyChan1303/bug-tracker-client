import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../services/alertsSlice';

const Support = () => {
  const dispatch = useDispatch();

  const handleTest = () => {
    dispatch(addAlert({ severity: 'warning', message: 'sdfgsdf' }));
  };

  return (
    <>
      Send a support Ticket here!!
      <Button onClick={handleTest}>handleTest</Button>
    </>
  );
};

export default Support;
