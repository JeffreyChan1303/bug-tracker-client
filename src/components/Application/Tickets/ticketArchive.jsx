import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, IconButton, Tooltip, TextField, Chip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RestoreIcon from '@mui/icons-material/Restore';

import { getArchivedTickets, getArchivedTicketsBySearch } from '../../../services/ticket/ticketArchiveSlice';
import { restoreTicketFromArchive } from '../../../services/ticket/ticketDetailsSlice';
import CustomPagination from '../pagination';

const BoldedTableCell = styled(TableCell) (({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell) (({theme}) => ({
    padding: "5px",
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const TicketArchive = () => {
    const query = useQuery();
    const navigate = useNavigate();
    // const location = useLocation();
    const page = query.get('page');
    // const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const { loading, tickets, currentPage, numberOfPages } = useSelector((state) => state.ticketArchive);
    const dispatch = useDispatch();

    useEffect(() => {
       if (search.trim()) {
           dispatch(getArchivedTicketsBySearch({ search, page }));
       } else {
           dispatch(getArchivedTickets(page));
       }
    }, [page])

    const searchArchivedTickets = () => {
        if (search.trim()) {
            dispatch(getArchivedTicketsBySearch({ search, page: 1 }))
            navigate(`/ticketArchive/search?searchQuery=${search || 'none'}&page=1`);
        } else {
            navigate('/ticketArchive')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchArchivedTickets();
        }
    }

    const handleRestoreTicket = (id) => {
        dispatch(restoreTicketFromArchive(id));
        navigate('/allTickets')
    }

    return (
        loading ? <CircularProgress color="inherit" /> : (
        <>
            <Paper sx={{ p: 3 }} elevation={3} >
                <Box sx={{  overflowX: 'scroll' }} >
                    <Typography variant="h5" fontWeight={700}> Archived Tickets </Typography>
                    <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Typography align="right" variant="body1"> Search:&nbsp; </Typography>
                        <TextField 
                            size="small" 
                            variant="standard"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
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
                                <BoldedTableCell align="center">Actions</BoldedTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {tickets && tickets.map((ticket, i) => (
                            <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <ContentTableCell component="th" scope="row">
                                    {ticket.title}
                                </ContentTableCell>
                                <ContentTableCell align="right">{ticket.name}</ContentTableCell>
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
                                        <IconButton onClick={() => navigate(`/ticketDetails/${ticket._id}`)}>
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* This should be changed to retrieve */}
                                    <Tooltip title="Restore">
                                        <IconButton onClick={() => handleRestoreTicket(ticket._id)}>
                                            <RestoreIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ContentTableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>

                <CustomPagination 
                    path={`/archivedTickets${search.trim()? `/search?searchQuery=${search}&` : `?`}`}
                    page={page}
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                />
            </Paper>
        </>
        )
    )
};

export default TicketArchive;