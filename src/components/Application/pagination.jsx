import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAllTickets } from '../../services/ticket/allTicketsSlice'

const CustomPagination = ({ path, page, numberOfPages }) => {
    const dispatch = useDispatch();
    // const { tickets } = useSelector(state => state.allTickets);
    // console.log(page)


    return (
        <Pagination
            sx={{ ul: {justifyContent: "space-around" } }}
            count={Number(numberOfPages)}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    { ...item }
                    component={Link}
                    to={`${path}page=${item.page}`}
                />
            )}
        />
    )
};

export default CustomPagination
