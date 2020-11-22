import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Home } from '@pages/home/home';
import 'typeface-roboto';
import './pages/global.css';

export const App = () => {
  return <Home />;
};

ReactDOM.render(<App />, document.getElementById('root'));
