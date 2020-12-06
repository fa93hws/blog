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

import { createPages } from '@pages/create-pages';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import { createAlert } from '@components/alert/alert';
import { HashRouter } from 'react-router-dom';
import '@pages/global.css';

const theme = responsiveFontSizes(createMuiTheme());

type AppProps = {
  Pages: React.ComponentType;
  Alert: React.ComponentType;
};
const AppSkeleton = ({ Pages, Alert }: AppProps) => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  }, [setHeight]);

  return (
    <React.StrictMode>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Alert />
          <Box display="flex" flexDirection="column" minHeight={height}>
            <Header />
            <Box flexGrow="1" component="main" display="flex" padding={2}>
              <Pages />
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </HashRouter>
    </React.StrictMode>
  );
};

const { Component: Alert, showGlobalMsg } = createAlert();
const Pages = createPages({ showGlobalMsg });
const App = () => <AppSkeleton Pages={Pages} Alert={Alert} />;
ReactDOM.render(<App />, document.getElementById('root'));
