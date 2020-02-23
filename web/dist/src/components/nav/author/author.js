import * as React from 'react';
import styles from './author.css';
export var Author = function (_a) {
    var name = _a.name, email = _a.email, avatar = _a.avatar;
    return (React.createElement("div", { className: styles.container },
        React.createElement("a", { href: avatar.linkTo },
            React.createElement("img", { src: avatar.img, alt: avatar.alt, className: styles.avatarImg })),
        React.createElement("p", { className: styles.name }, name),
        React.createElement("p", { className: styles.email }, email)));
};
