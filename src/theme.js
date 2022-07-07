import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        background: {
            paper: '#f5f5f5',
            default: '#f5f5f5',
        },
    }
});
theme = responsiveFontSizes(theme);

export default theme;