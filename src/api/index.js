import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:9000' });
const API = axios.create({ baseURL: 'https://juicy-bug-tracker.herokuapp.com/' });


// this puts the token as the header for the backend to verify
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// Dashboard APIs

export const getActiveProjects = () => API.get('/projects/activeProjects');
export const getActiveTickets = () => API.get('/tickets/activeTickets');
export const getUnreadNotifications = () => API.get('/users/unreadNotifications');

// User APIs
export const signIn = (formData) => API.post('/users/signin', formData);
export const googleSignin = (userData, token) => API.post('/users/googleSignin', { userData, token })
export const signUp = (formData) => API.post('/users/signup', formData);
export const emailVerification = (token) => API.patch(`/users/verification/${token}`);
export const sendNewVerificationLink = (email) => API.post(`/users/sendVerification`, { email });

export const getAllUsersBySearch = (page, searchQuery) => API.get(`/users/allUsers/search?searchQuery=${searchQuery || ''}&page=${page}`);

export const getUserNotificationsBySearch = (page, searchQuery) => API.get(`/users/notifications/search?searchQuery=${searchQuery || ''}&page=${page}`);
export const deleteUserNotification = (createdAt) => API.put('/users/deleteUserNotification', createdAt);
export const readNotification = (createdAt) => API.patch(`users/readNotification`, { createdAt });
export const readAllNotifications = () => API.patch(`users/readAllNotifications`);

// Ticket APIs
export const getAllTicketsBySearch = (page, searchQuery) => API.get(`/tickets/allTickets/search?searchQuery=${searchQuery || ''}&page=${page}`);
export const getMyTicketsBySearch = (page, searchQuery) => API.get(`/tickets/myTickets/search?searchQuery=${searchQuery || ''}&page=${page}`);
export const getArchivedTicketsBySearch = (page, searchQuery) => API.get(`/tickets/archivedTickets/search?searchQuery=${searchQuery || ''}&page=${page}`);
export const moveTicketToArchive = (id) => API.put(`/tickets/moveTicketToArchive/${id}`);
export const restoreTicketFromArchive = (id) => API.put(`/tickets/restoreTicketFromArchive/${id}`);
export const deleteTicketFromArchive = (id) => API.delete(`/tickets/deleteTicketFromArchive/${id}`);

export const getUnassignedTickets = (page, searchQuery) => API.get(`/tickets/unassignedTickets?searchQuery=${searchQuery || ''}&page=${page}`);

export const createTicket = (newTicket) => API.post('/tickets/createTicket', newTicket);
export const updateTicket = (newTicket) => API.patch(`tickets/updateTicket/${newTicket.ticketId}`, newTicket);

export const getTicketDetails = (id) => API.get(`tickets/ticketDetails/${id}`);
export const addTicketComment = (id, comment) => API.patch(`tickets/addTicketComment/${id}`, comment);
export const deleteTicketComment = (ticketId, commentCreatedAt) => API.patch(`tickets/deleteTicketComment/${ticketId}`, commentCreatedAt);
export const getMyTicketStatistics = () => API.get('/tickets/myTicketStatistics');

export const claimTicket = (ticketId, userId) => API.patch(`tickets/claimTicket/${ticketId}`, { userId });

export const getSupportTicketsBySearch = (page, searchQuery) => API.get(`/tickets/supportTickets/search?searchQuery=${searchQuery || ''}&page=${page}`);
export const addSupportTicket = (ticketData) => API.post(`/tickets/createSupportTicket`, ticketData);

// Project APIs
export const getAllProjectsBySearch = (page, searchQuery) => API.get(`/projects/allProjects/search?searchQuery=${searchQuery || ''}&page=${page}`);
export const getMyProjectsBySearch = (page, searchQuery) => API.get(`/projects/myProjects/search?searchQuery=${searchQuery || ''}&page=${page}`);
export const getArchivedProjectsBySearch = (page, searchQuery) => API.get(`/projects/archivedProjects/search?searchQuery=${searchQuery || ''}&page=${page}`);

export const createProject = (newProject) => API.post('/projects/createProject', newProject);
// eslint-disable-next-line no-underscore-dangle
export const updateProject = (newProject) => API.patch(`/projects/updateProject/${newProject._id}`, newProject);

export const getProjectDetails = (id) => API.get(`projects/projectDetails/${id}`);
export const getProjectTickets = (projectId) => API.get(`projects/projectTickets/${projectId}`);
export const getProjectUsers = (projectId) => API.get(`projects/projectUsers/${projectId}`);

export const moveProjectToArchive = (id) => API.put(`/projects/moveProjectToArchive/${id}`);
export const restoreProjectFromArchive = (projectId) => API.put(`/projects/restoreProjectFromArchive/${projectId}`)
export const deleteProjectFromArchive = (projectId) => API.delete(`/projects/deleteProjectFromArchive/${projectId}`);

export const updateUsersRoles = (projectId, users) => API.put(`/projects/updateUsersRoles/${projectId}`, users);
export const deleteUsersFromProject = (projectId, users) => API.put(`/projects/deleteUsersFromProject/${projectId}`, users);
export const inviteUsersToProject = (projectId, users, role) => API.patch(`/projects/inviteUsersToProject/${projectId}`, { users, role });
export const acceptProjectInvite = (notification) => API.patch(`/projects/acceptProjectInvite`, notification);
