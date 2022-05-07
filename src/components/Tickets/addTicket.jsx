import React, { useState } from 'react';
import { Box, Typography, Toolbar, TextField, Button, Paper } from '@mui/material';
import { spacing } from '@mui/system';

const AddTicket = ({ drawerWidth }) => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        description: '',
        priority: '',
        status: '',
    });

    const handleSubmit = () => {
        console.log(postData);
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />
            <Typography paragraph>
                Add Ticket
            </Typography>
            
            <Paper sx={{ p: 3, maxWidth: "800px" }} >
                <form autocomplete="off" noValidate onSubmit={handleSubmit} style={{  }}>
                    <Typography variant="body1" fontWeight={700}>Title</Typography>
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        value={postData.crator}
                        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                    />

                    <Typography variant="body1" fontWeight={700}>Description</Typography>
                    <TextField 
                        name="description" 
                        variant="outlined" 
                        label="Ticket Description" 
                        fullWidth
                        value={postData.crator}
                        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                    />

                    <Typography variant="body1" fontWeight={700}>Ticket Priority</Typography>
                    <TextField 
                        name="priority" 
                        variant="outlined" 
                        label="Ticket Priority" 
                        fullWidth
                        value={postData.crator}
                        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                    />
                    <Typography variant="body1" fontWeight={700}>Ticket Status</Typography>
                    <TextField 
                        name="status" 
                        variant="outlined" 
                        label="Ticket Status" 
                        fullWidth
                        value={postData.crator}
                        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                    />
                    

                    <Button sx={{}} variant="contained" color="primary" size="large" type="submit" >
                        Submit
                    </Button>
                    <Button sx={{}} variant="outlined" color="primary" size="large" type="cancel">
                        Cancel
                    </Button>

                </form>
            </Paper>

        </Box>
    )
};

export default AddTicket;