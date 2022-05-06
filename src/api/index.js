import axios from 'axios';

const url = 'http://localhost5000/tickets';

export const fetchTickets = () => axios.get(url);