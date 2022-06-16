import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Backdrop, CircularProgress, IconButton, Tooltip, TextField, Chip, AppBar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { getAllTickets, getAllTicketsBySearch } from '../../../services/ticket/allTicketsSlice';
import store from '../../../app/store';
import CustomPagination from '../pagination';

const BoldedTableCell = styled(TableCell)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    padding: "8px 5px",
}));

const ContentTableCell = styled(TableCell)(({theme}) => ({
    padding: "5px",
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const AllTickets = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const page = query.get('page');
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    // useSelector may be useful when we implement the dashboard which requires multiple api calls
    const { loading, tickets, currentPage, numberOfPages } = useSelector((state) => state.allTickets);

    const dispatch = useDispatch();

    const unsubscribe = store.subscribe(() => {
        // console.log('updated state: ', store.getState().allTickets)
    })


    useEffect(() => {
        /* 
        put the api fetch data function in here so every time the location or the user routes,
        the fetch data will be called and the new tickts will be updated every time you come back to the page!!
        The current, hook useGetAllTicketQuery is not working since we cann't put react hooks into a useEffect!!.
        */
       if (search.trim()) {
           dispatch(getAllTicketsBySearch({ search, page }));
       } else {
           dispatch(getAllTickets(page));
       }
    //    dispatch(getAllTickets(page));
    }, [page])



    if(loading) {
        return (
            <>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        )
    }

    const searchAllTickets = () => {
        if (search.trim()) {
            //dispatch an action
            
            dispatch(getAllTicketsBySearch({ search, page: 1 }))

            navigate(`/allTickets/search?searchQuery=${search || 'none'}&page=1`);
        } else {
            navigate('/allTickets')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // search for post... probably a dispatch or something here
            searchAllTickets();
        }
    }

    return (
        <>
            <Paper sx={{ p: 3, overflowX: 'scroll' }} elevation={3}>

                <Typography variant="h5" fontWeight={700}> All Tickets </Typography>
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
                                    <IconButton href={`/ticketDetails/${ticket._id}`}>
                                        <VisibilityOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton href={`/editTicket/${ticket._id}`}>
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </ContentTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>

            </Paper>


            <Paper elevation={6} >
                <CustomPagination 
                    path={`/allTickets${search.trim()? `/search?searchQuery=${search}&` : `?`}`}
                    page={page}
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
            />
            </Paper>
        </>
    )
};

export default AllTickets;