import React from 'react';
import { Box } from '@mui/material';

import MyTickets from '../Tickets/myTickets';
import DashboardCharts from './dashboardCharts';
import DashboardCards from './dashboardCards';

const Dashboard = () => (
  <>
    {/* Cards */}
    <DashboardCards />
    {/* Charts */}
    <DashboardCharts />

    <Box sx={{ mt: 2, display: { xs: 'none', lg: 'block' } }}>
      {/* Put a property for pagination so we can input wheather we want pagination or not on this component */}
      <MyTickets />
    </Box>
  </>
);

export default Dashboard;
