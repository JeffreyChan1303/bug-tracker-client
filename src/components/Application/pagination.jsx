import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomPagination = ({ path, page, numberOfPages }) => {

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
