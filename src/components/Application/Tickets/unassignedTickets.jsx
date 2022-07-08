import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@mui/material';

import { getUnassignedTickets } from '../../../services/ticket/getUnassignedTickets';
import { useEffect } from 'react';



const UnassignedTickets = () => {
    const dispatch = useDispatch()
    const { tickets, loading } = useSelector(state => state.unassignedTickets);


    useEffect(() => {
        dispatch(getUnassignedTickets());
    }, [])

    return (
        loading ? <CircularProgress color="inherit" /> :
        <>
            <Typography variant="h6" >
                Unassigned Tickets
            </Typography>
        </>
    )
}

export default UnassignedTickets