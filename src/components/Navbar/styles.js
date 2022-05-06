import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    accordion: {
        '& .Mui-expanded:before': {
            opacity: '1'
        }
    },
    accordionSummary: {
        '&:hover': {
            backgroundColor: "#f5f5f5",
        },
        '& .Mui-expanded': {
            margin: '5px 0'
        }
    },
    accordionDetails: {
        // padding: '0 16px',
        color: 'red',
    },
    test: {
        color: 'red',
    },
    listItem: {
        '&::before': {
            backgroundColor: 'red',
        }
    }
}));