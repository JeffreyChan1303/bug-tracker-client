import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import App from './App';
import store from './app/store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// console.log(theme);


root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                        <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);


// idea. a landing page that says. Universal ticket tracking software that you can use to track anything from problems to people checking into your store