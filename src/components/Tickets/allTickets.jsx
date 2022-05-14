import React from 'react';
import { Box, Typography, Toolbar, Paper, Pagination, Table, TableHead, TableRow, TableCell, TableBody, Backdrop, CircularProgress, IconButton, Tooltip, TextField, TablePagination, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


import { useGetAllTicketsQuery } from '../../services/ticketApi';

const BoldedTableCell = styled(TableCell)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell)(({theme}) => ({
    padding: "5px",
}));



const AllTickets = ({ drawerWidth }) => {
    const { data, isFetching } = useGetAllTicketsQuery();
    console.log(data, isFetching);



    if(isFetching) {
        return (
            <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
                <Toolbar />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        )
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
            <Toolbar />

            <Paper sx={{ p: 3 }} elevation={3}>

                <Typography variant="h5" fontWeight={700}> All Tickets </Typography>
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Typography align="right" variant="body1"> Search:&nbsp; </Typography>
                    <TextField size="small" variant="standard" />
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small" >
                    <TableHead>
                        <TableRow >
                            <BoldedTableCell>Title</BoldedTableCell>
                            <BoldedTableCell sx={{ fontWeight: 600 }} align="right">Submitted By</BoldedTableCell>
                            <BoldedTableCell align="right">Developer</BoldedTableCell>
                            <BoldedTableCell align="right">Status</BoldedTableCell>
                            <BoldedTableCell align="right">Priority</BoldedTableCell>
                            <BoldedTableCell align="right">Last Updated</BoldedTableCell>
                            <BoldedTableCell align="right">Actions</BoldedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data && data.map((ticket) => (
                        <TableRow
                        key={ticket.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <ContentTableCell component="th" scope="row">
                                {ticket.title}
                            </ContentTableCell>
                            <ContentTableCell align="right">{ticket.creator}</ContentTableCell>
                            <ContentTableCell align="right">add ticket developer</ContentTableCell>
                            <ContentTableCell align="right">
                                <Chip label={ticket.status} variant="outlined" color="secondary" />
                            </ContentTableCell>
                            <ContentTableCell align="right">
                                <Chip label={ticket.priority} variant="outlined" color="secondary" />
                            </ContentTableCell>
                            <ContentTableCell align="right">add last updated</ContentTableCell>
                            <ContentTableCell sx={{ display: "flex", justifyContent: "center" }}>
                                <Tooltip title="View">
                                    <IconButton href="/myTickets">
                                        <VisibilityOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton>
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </ContentTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <Pagination count={10} variant="outlined"/>
                </Table>

            </Paper>
        </Box>
    )
};

export default AllTickets;