import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        useNextVariants: true,
        fontFamily: "\"BKoodkBd\", \"Helvetica\", \"Arial\", sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    },
});

export default theme