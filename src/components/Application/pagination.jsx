import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Paginate = ({ path }) => {

    return (
        <Pagination
            sx={{ ul: {justifyContent: "space-around" } }}
            count={5}
            page={1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    { ...item }
                    component={Link}
                    to={`${path}?page=${1}`}
                />
            )}
        />
    )
};

export default Paginate
