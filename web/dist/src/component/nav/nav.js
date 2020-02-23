import * as React from 'react';
import styles from './nav.css';
import { Author } from './author/author';
export var Nav = function (_a) {
    var author = _a.author;
    return (React.createElement("nav", { className: styles.nav },
        React.createElement(Author, { name: author.name, email: author.email, avatar: author.avatar }),
        React.createElement("div", { className: styles.content }, "This is content")));
};
