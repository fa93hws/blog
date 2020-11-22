import CssBaseline from '@material-ui/core/CssBaseline';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Home } from '@pages/home/home';
import 'typeface-roboto';
import './pages/global.css';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Home />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
