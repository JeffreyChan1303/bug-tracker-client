import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getProjectTickets } from '../../services/project/projectDetailsSlice';


const Support = () => {
    const dispatch = useDispatch();

    const projectId = "62cc5cf17ccfa7bd82d7a786";

    const handleTest = () => {
        dispatch(getProjectTickets(projectId))
    }

    return (
        <>
            Send a support Ticket here!!
            <Button onClick={handleTest} >
                handleTest
            </Button>
        </>
    )
}

export default Support;