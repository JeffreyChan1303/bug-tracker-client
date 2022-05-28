import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ticketApiHeaders = {

}

const createRequest = (url) => ({ url, method: 'GET', headers: ticketApiHeaders })

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
        }),
        updateTicket: builder.mutation({
            query: (updatedTicket) => {
                console.log("Updated Ticket: ", updatedTicket);
                return {
                    url: `/tickets/updateTicket/${updatedTicket._id}`,
                    method: 'PATCH',
                    body: updatedTicket,
                    headers: ticketApiHeaders,
                }
            }
        }),
        getTicketDetails: builder.query({
            query: (id) => createRequest(`/tickets/ticketDetails/${id}`),
        }),
        deleteTicket: builder.mutation({
            query: (id) => {
                console.log("Deleted Ticket Id: ", id);
                return {
                    url: `/tickets/deleteTicket/${id}`,
                    method: 'DELETE',
                }
            }
        })
    })
});

export const {
    useGetAllTicketsQuery,
    useCreateTicketMutation,
    useUpdateTicketMutation,
    useGetTicketDetailsQuery,
    useDeleteTicketMutation,
} = ticketApi;

