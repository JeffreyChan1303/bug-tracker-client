import React, { useState } from 'react';
import { Alert, Fade, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux';
import { closeCrudFeedbackById } from '../../../services/crudFeedbackSlice';



const CrudAlert = () => {

    const dispatch = useDispatch();
    const { alerts } = useSelector((state) => state.crudFeedback);

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    left: "calc((3vh + 3vw) / 2)",
                    bottom: "calc((3vh + 3vw) / 2)",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
            {alerts && alerts.map((element, index) => (
                <Fade in={alerts[index].isShown} 
                    key={element.id}
                    timeout={700}
                >
                    <Alert 
                        sx={{
                            mt: "5px"
                        }}
                        severity={element.severity} 
                        variant="filled"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                dispatch(closeCrudFeedbackById(element.id));
                            }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        {element.message}
                    </Alert>
                </Fade>
            ))}
            </Box>
        </>
    )
}

export default CrudAlert;