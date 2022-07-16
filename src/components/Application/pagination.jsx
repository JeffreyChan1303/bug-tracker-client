import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomPagination = ({ path, page, numberOfPages }) => (
  <Pagination
    sx={{ ul: { justifyContent: 'space-around' }, mt: '20px' }}
    count={Number(numberOfPages)}
    page={Number(page) || 1}
    variant="outlined"
    color="primary"
    renderItem={(item) => (
      <PaginationItem {...item} component={Link} to={`${path}page=${item.page}`} />
    )}
  />
);

export default CustomPagination;
