import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import App from './App';

const theme = createTheme();
const app = (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
