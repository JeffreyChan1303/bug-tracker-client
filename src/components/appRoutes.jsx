import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Dashboard,
  AddProject,
  AllProjects,
  EditProject,
  MyProjects,
  ProjectArchive,
  ProjectDetails,
  AddTicket,
  AllTickets,
  EditTicket,
  MyTickets,
  TicketArchive,
  TicketDetails,
  ManageUserRoles,
  Notifications,
  AllSupportTickets,
  UnassignedTickets,
  AssignTicket,
  Profile,
  Settings,
  AboutPage,
  ProjectUsers,
  ProjectTickets,
} from './Application/index';

const AppRoutes = () => (
  <Routes>
    <Route exact path="/*" element={<Navigate to="/dashboard" replace />} />
    <Route exact path="/dashboard" element={<Dashboard />} />
    <Route exact path="/allSupportTickets" element={<AllSupportTickets />} />
    <Route exact path="/addSupportTicket" element={<AddTicket support />} />
    <Route exact path="/about" element={<AboutPage />} />

    {/* Project Routes */}
    <Route exact path="/allProjects" element={<AllProjects />} />
    <Route exact path="/allProjects/search" element={<AllProjects />} />

    <Route exact path="/myProjects" element={<MyProjects />} />
    <Route exact path="/myProjects/search" element={<MyProjects />} />

    <Route exact path="/projectArchive" element={<ProjectArchive />} />
    <Route exact path="/projectArchive/search" element={<ProjectArchive />} />

    <Route exact path="/addProject" element={<AddProject />} />
    <Route exact path="/editProject/:id" element={<EditProject />} />
    <Route exact path="/projectDetails/:projectId" element={<ProjectDetails />} />
    <Route exact path="/projectDetails/projectUsers/:projectId" element={<ProjectUsers />} />
    <Route exact path="/projectDetails/projectTickets/:projectId" element={<ProjectTickets />} />

    <Route exact path="/projectDetails/manageUserRoles/:projectId" element={<ManageUserRoles />} />
    <Route
      exact
      path="/projectDetails/manageUserRoles/:projectId/search"
      element={<ManageUserRoles />}
    />

    <Route exact path="/projectDetails/assignTicket/:projectId" element={<AssignTicket />} />

    {/* Ticket Routes */}
    <Route exact path="/allTickets" element={<AllTickets />} />
    <Route exact path="/allTickets/search" element={<AllTickets />} />

    <Route exact path="/myTickets" element={<MyTickets />} />

    <Route exact path="/unassignedTickets" element={<UnassignedTickets />} />

    <Route exact path="/ticketArchive" element={<TicketArchive />} />
    <Route exact path="/ticketArchive/search" element={<TicketArchive />} />

    <Route exact path="/addTicket" element={<AddTicket />} />
    <Route exact path="/editTicket/:ticketId" element={<EditTicket />} />
    <Route exact path="/ticketDetails/:ticketId" element={<TicketDetails />} />

    {/* User Routes */}

    <Route exact path="/profile" element={<Profile />} />
    <Route exact path="/settings" element={<Settings />} />
    <Route exact path="/notifications" element={<Notifications />} />
    <Route exact path="/notifications/search" element={<Notifications />} />
  </Routes>
);

export default AppRoutes;
