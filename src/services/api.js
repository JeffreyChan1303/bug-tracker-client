import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {

}

const createRequest = (url) => ({ url, headers: apiHeaders })

const baseUrl = 'http://localhost:9000';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllTickets: builder.query({
            query: () => createRequest('/tickets'),
        })
    })
});

export const {
    useGetAllTicketsQuery,
} = api;

