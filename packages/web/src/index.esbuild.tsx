import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './pages/global.css';

export const App = () => {
  const SkeletonImpl = () => <div>hello world!</div>;
  return <SkeletonImpl />;
};

ReactDOM.render(<App />, document.getElementById('root'));
