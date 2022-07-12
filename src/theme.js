import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        paper: 'rgb(245, 245, 245)',
        default: 'rgb(241, 241, 241)',
      },
    },
  }),
);

// theme = responsiveFontSizes(theme);

export default theme;
