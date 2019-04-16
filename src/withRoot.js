import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';

export const withRoot = (Component) => (props) => (
    <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <Component {...props} />
    </MuiThemeProvider>
);
