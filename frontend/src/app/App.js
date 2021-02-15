import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import AppContext from './AppContext';
import DashboardLayout from 'app/layouts/DashboardLayout';
import { theme } from 'app/constants';

const customTheme = createMuiTheme(theme);

const App = () => {
  return (
    <AppContext.Provider value={Date.now()}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <DashboardLayout />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
