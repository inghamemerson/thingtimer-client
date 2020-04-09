import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#228B22',
    },
    secondary: {
      main: '#dc3545',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#efefef',
    },
  },
});

export default theme;