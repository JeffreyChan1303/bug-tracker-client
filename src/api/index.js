import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9000' });

// this puts the token as the header for the backend to verify
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('prifile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('users/signin', formData);
export const signUp = (formData) => API.post('users/signup', formData);

export const getAllTickets = () => API.get('tickets/allTickets');
export const getAllTicketsBySearch = (searchQuery) => API.get(`/tickets/allTickets/search?searchQuery=${searchQuery.search || 'none'}`);