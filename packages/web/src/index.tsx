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
import './pages/global.css';

const theme = responsiveFontSizes(createMuiTheme());

type AppProps = {
  Pages: React.ComponentType;
};
const AppSkeleton = ({ Pages }: AppProps) => {
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
          <Pages />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

function createApp() {
  const Pages = createPages();
  return () => <AppSkeleton Pages={Pages} />;
}

const App = createApp();

ReactDOM.render(<App />, document.getElementById('root'));
