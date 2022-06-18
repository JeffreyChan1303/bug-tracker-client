import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9000' });

// this puts the token as the header for the backend to verify
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const getAllTickets = (page) => API.get(`/tickets/allTickets?page=${page}`);
export const getAllTicketsBySearch = (searchQuery, page) => API.get(`/tickets/allTickets/search?searchQuery=${searchQuery || 'none'}&page=${page}`);
export const getMyTickets = (page) => API.get(`/tickets/myTickets?page=${page}`);
export const getMyTicketsBySearch = (searchQuery, page) => API.get(`/tickets/myTickets/search?searchQuery=${searchQuery || 'none'}&page=${page}`);

export const createTicket = (newTicket) => API.post('/tickets/createTicket', newTicket);

export const getTicketDetails = (id) => API.get(`tickets/ticketDetails/${id}`)
export const deleteTicket = (id) => API.delete(`/tickets/deleteTicket/${id}`);