import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    black,
    white,
    primary: {
      contrastText: white,
      dark: '#8b7d6b',
      main: '#8b7d6b',
      light: '#ffe4c4',
    },
    secondary: {
      contrastText: white,
      dark: '#cdb79e',
      main: '#cdb79e',
      light: 'ffe4e1'
    },
    tab: {
        color: white,
    },
    success: {
      contrastText: white,
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400]
    },
    info: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400]
    },
    warning: {
      contrastText: white,
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400]
    },
    error: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400]
    },
    text: {
      primary: colors.blueGrey[800],
      secondary: colors.blueGrey[600],
      link: colors.blue[600]
    },
    background: {
      default: '#faf0e6',
      paper: white
    },
    logo: {
      maxWidth: 40,
      marginRight: '10px'
    },
    icon: colors.blueGrey[600],
    divider: colors.grey[200]
  },
    button: {
    color: '#cdaf95'
    },
});


// A custom theme for this app
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// });


export default theme;