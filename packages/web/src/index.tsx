import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import 'typeface-roboto';

import { Home } from '@pages/home/home';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import './pages/global.css';

const theme = responsiveFontSizes(createMuiTheme());

export const App = () => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  }, [setHeight]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight={height}>
        <Header />
        <Box flexGrow="1" component="main">
          <Home />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
