import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9000' });

// this puts the token as the header for the backend to verify
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// User APIs
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

// Ticket APIs
export const getAllTickets = (page) => API.get(`/tickets/allTickets?page=${page}`);
export const getAllTicketsBySearch = (page, searchQuery) => API.get(`/tickets/allTickets/search?searchQuery=${searchQuery || 'none'}&page=${page}`);
export const getMyTickets = (page) => API.get(`/tickets/myTickets?page=${page}`);
export const getMyTicketsBySearch = (page, searchQuery) => API.get(`/tickets/myTickets/search?searchQuery=${searchQuery || 'none'}&page=${page}`);
export const getArchivedTickets = (page) => API.get(`/tickets/archivedTickets?page=${page}`);
export const getArchivedTicketsBySearch = (page, searchQuery) => API.get(`/tickets/archivedTickets/search?searchQuery=${searchQuery || 'none'}&page=${page}`);

export const createTicket = (newTicket) => API.post('/tickets/createTicket', newTicket);
export const updateTicket = (newTicket) => API.patch(`tickets/updateTicket/${newTicket._id}`, newTicket);

export const getTicketDetails = (id) => API.get(`tickets/ticketDetails/${id}`)

export const deleteTicket = (id) => API.delete(`/tickets/deleteTicket/${id}`);

// Project APIs

export const getAllProjects = (page) => API.get(`/projects/allProjects?page=${page}`);
export const getAllProjectsBySearch = (page, searchQuery) => API. get(`/projects/allProjects/search?searchQuery=${searchQuery || 'none'}&page=${page}`);


export const createProject = (newProject) => API.post('/projects/createProject', newProject);