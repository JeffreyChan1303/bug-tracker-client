import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ticketApiHeaders = {

}

const createRequest = (url) => ({ url, headers: ticketApiHeaders })

const baseUrl = 'http://localhost:9000';

export const ticketApi = createApi({
    reducerPath: 'ticketApi', // name
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllTickets: builder.query({
            query: () => createRequest('/tickets/allTickets'),
        }),
        createTicket: builder.mutation({
            query: (newTicket) => {
                console.log("Created Ticket: ", newTicket);
                return {
                    url: `/tickets/createTicket`,
                    method: 'POST',
                    body: newTicket, // this is the payload
                    headers: ticketApiHeaders,
                }
            }
        })
    })
});

export const {
    useGetAllTicketsQuery,
    useCreateTicketMutation,
} = ticketApi;

