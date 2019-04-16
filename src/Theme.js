import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

const Theme = createMuiTheme({
    palette: {
        primary: {
            light: teal[300],
            main: teal[500],
            dark: teal[700],
        },
        secondary: {
            light: '#fff',
            main: '#fff',
            dark: '#fff',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

export default Theme;
