import axios from 'axios';

const url = 'http://localhost:9000/tickets';

export const fetchTickets = () => axios.get(url);