import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createSkeleton } from './pages/skeleton';
import './pages/global.css';
export var App = function () {
    var SkeletonImpl = createSkeleton();
    return React.createElement(SkeletonImpl, null);
};
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
