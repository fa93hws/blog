import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createHomePage } from './pages/home/home';
import { Skeleton } from './pages/skeleton';
import { createNav } from './component/nav/nav';

export const App = () => {
  const Nav = createNav();
  const MainContent = createHomePage();
  return <Skeleton Nav={Nav} MainContent={MainContent} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
