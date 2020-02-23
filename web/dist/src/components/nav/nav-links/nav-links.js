import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav-links.css';
var NavLink = function (_a) {
    var _b = _a.item, text = _b.text, link = _b.link;
    return (React.createElement("li", null,
        React.createElement(Link, { to: link, className: styles.link }, text)));
};
export var NavLinks = function (_a) {
    var items = _a.items;
    return (React.createElement("ul", { className: styles.list }, items.map(function (item, idx) { return (React.createElement(NavLink, { item: item, key: idx })); })));
};
