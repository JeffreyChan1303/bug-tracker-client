import React, { useState } from 'react';
import { Alert, Button, Container, Fade, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux';
import { crudFeedbackSuccess, closeCrudFeedback } from '../../../services/crudFeedbackSlice';



const CrudAlert = () => {

    const dispatch = useDispatch();
    const crudFeedback = useSelector((state) => state.crudFeedback);

    

    return (
        <>
            <Button onClick={() => dispatch(crudFeedbackSuccess("this asldnf la bad!!!"))}>asdf</Button>
            <Fade in={crudFeedback.isShown}>
                <Alert 
                    sx={{
                        position: "fixed",
                        left: "calc((3vh + 3vw) / 2)",
                        bottom: "calc((3vh + 3vw) / 2)",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    severity="success" 
                    variant="filled"
                    action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            dispatch(closeCrudFeedback());
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    This is a test alert
                </Alert>
            </Fade>
        </>
    )
}

export default CrudAlert;