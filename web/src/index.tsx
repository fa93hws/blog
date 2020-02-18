import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createSkeleton } from './pages/skeleton';
import './pages/global.css';

export const App = () => {
  const SkeletonImpl = createSkeleton();
  return <SkeletonImpl />;
};

ReactDOM.render(<App />, document.getElementById('root'));
