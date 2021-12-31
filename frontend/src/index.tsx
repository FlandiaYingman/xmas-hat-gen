import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";

const theme = createTheme();

ReactDOM.render(<React.StrictMode>
    <ThemeProvider theme={theme}>
        <App/>
    </ThemeProvider>
</React.StrictMode>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
