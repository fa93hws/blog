import * as React from 'react';
import { storiesOf } from '@storybook/react';
import * as Icons from '../icons';
import styles from './icons.stories.css';
var IconContainer = function (_a) {
    var Icon = _a.Icon, title = _a.title;
    var allSizes = ['small', 'medium', 'large'];
    return (React.createElement("div", null,
        React.createElement("section", { className: styles.container },
            React.createElement("h1", null,
                title,
                ": "),
            React.createElement("div", { className: styles.section }, allSizes.map(function (s) { return (React.createElement(Icon, { size: s, title: title + "-" + s, key: s, className: styles.icon })); })))));
};
storiesOf('components.icons', module).add('global nav', function () { return (React.createElement("div", null, Object.entries(Icons).map(function (_a) {
    var title = _a[0], Icon = _a[1];
    return (React.createElement(IconContainer, { title: title, Icon: Icon, key: title }));
}))); });
