import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Box } from '@mui/material';

import { getMyTicketStatistics } from '../../../services/ticket/myTicketsSlice';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const barOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  // responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'My Tickets By Priority',
      font: {
        size: 20,
      },
    },
    legend: {
      display: false,
    },
    subtitle: {
      display: true,
      text: 'this is a subtitle',
    },
  },
  layout: {
    padding: 30,
  },
  maintainAspectRatio: false,
};

const doughnutOptions = {
  plugins: {
    title: {
      display: true,
      text: 'My Tickets By Type',
      font: {
        size: 18,
      },
    },
    subtitle: {
      display: true,
      text: 'test',
    },
  },
  layout: {
    padding: 10,
  },
};

// NOTE!! Charts do not shirink when changing viewpoirt manually
// this is not a problem since consumers wil not be manually changing viewport.
const DashboardCharts = () => {
  const dispatch = useDispatch();
  const {
    myTicketsStatistics: {
      numberOfBugTickets,
      numberOfFeatureTickets,
      lowPriority,
      mediumPriority,
      highPriority,
    },
  } = useSelector((state) => state.myTickets);

  useEffect(() => {
    dispatch(getMyTicketStatistics());
  }, []);

  const barData = {
    labels: ['low', 'medium', 'high'],
    datasets: [
      {
        label: null,
        data: [lowPriority, mediumPriority, highPriority],
        borderColor: ['rgb(255, 205, 86)', 'rgb(255, 159, 64)', 'rgb(255, 99, 132)'],
        backgroundColor: [
          'rgba(255, 205, 86, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ['Bugs', 'Features'],
    datasets: [
      {
        label: '# of Votes',
        data: [numberOfBugTickets, numberOfFeatureTickets],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} lg={8}>
        <Paper elevation={1} sx={{ position: 'relative', width: '100%', height: '400px' }}>
          <Box position="relative" sx={{ height: '400px' }}>
            <Bar options={barOptions} data={barData} />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Paper elevation={1} sx={{ width: '100%', height: '400px' }}>
          <Box position="relative" sx={{ maxWidth: '380px', margin: '0 auto' }}>
            {/* learn chartjs and add the numbers into the chart in the doughnut chart */}
            <Doughnut options={doughnutOptions} data={doughnutData} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
