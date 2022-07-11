import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { claimTicket } from '../../../services/ticket/unassignedTicketsSlice';
import { handleAlerts } from '../../../services/alertsSlice';

import ProjectTickets from './projectTickets';


const AssignTickets = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    const [selectedUser, setSelectedUser] = useState('');
    const [selectedTicket, setSelectedTicket] = useState('');



    const assignTicket = () => {
        if (!selectedUser) {
            dispatch(handleAlerts({ severity: 'warning', message: 'Please choose a user to assign a ticket to' }));
        }

        if (!selectedTicket) {
            dispatch(handleAlerts({ severity: 'warning', message: 'Please choose a ticket to assign'}));
        }

        if (selectedUser && selectedTicket) {
            // make it so the user is in the body of the request. so we can assign someone a ticket by telling that the selected user wants to claim the ticket
            dispatch(claimTicket(selectedUser))
        }
    }

    const handleSelectUser = (userId) => {
        setSelectedUser(String(userId));
    }
    const handleSelectTicket = (ticketId) => {
        setSelectedTicket(String(ticketId));
    }

    return (
        <>
            Assign ticket page
            

            <ProjectTickets projectId={projectId} handleSelectTicket={handleSelectTicket} />
        </>
    )
}

export default AssignTickets;