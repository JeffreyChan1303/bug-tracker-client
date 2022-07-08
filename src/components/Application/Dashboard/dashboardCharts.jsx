import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Container, Grid, Paper, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title );

const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        },
    ],
};

const barOptions = {
    indexAxis: 'y' ,
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
      },
    },
  };
  
const labels = ['low', 'medium', 'high'];
  
const barData = {
    labels,
    datasets: [
      {
        label: null,
        data: [1, 4, 5],
        borderColor: ['rgb(255, 205, 86)', 'rgb(255, 159, 64)', 'rgb(255, 99, 132)'],
        backgroundColor: [ 'rgba(255, 205, 86, 0.5)', 'rgba(255, 159, 64, 0.5)','rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

const DashboardCharts = () => {

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} lg={8} >
                <Paper elevation={1} sx={{ position: 'relative', width: "100%", height: "400px" }} >
                    <Typography variant="h6" >
                        {/* Current Ticket priority */}
                    </Typography>

                    {/* Chart 1 */}
                    {/* WE NEED TO FIX THESE CHARTS. UNDERSTAND CHART.JS MORE!!!! */}
                    <Container sx={{ }} >
                        <Bar options={barOptions} data={barData} />
                    </Container>

                </Paper>
            </Grid>

            <Grid item xs={12} lg={4} >
                <Paper elevation={1} sx={{ width: "100%", height: "400px" }} >
                    <Doughnut data={doughnutData}  />
                    <Typography variant="body1">
                        {/* Bugs: , Features:  */}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default DashboardCharts;
