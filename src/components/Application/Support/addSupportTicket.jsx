import React from 'react';
import { useDispatch } from 'react-redux';
import AddTicket from '../Tickets/addTicket';
import { handleAddSupportTicket } from '../../../services/ticket/supportTicketsSlice';

const AddSupportTicket = () => {
  const dispatch = useDispatch();

  const handleAddSupportTicket = (ticketData) => {
    dispatch(addSupportTicket(ticketData));
  };

  return <AddTicket handleAddSupportTicket={handleAddSupportTicket} />;
};

export default AddSupportTicket;
