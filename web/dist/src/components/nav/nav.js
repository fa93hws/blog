import * as React from 'react';
import styles from './nav.css';
import { Author } from './author/author';
import { SourceCodeBanner } from './banner/banner';
import { NavLinks } from './nav-links/nav-links';
export var Nav = function (_a) {
    var author = _a.author, sourceCodeUrl = _a.sourceCodeUrl, navItems = _a.navItems;
    return (React.createElement("nav", { className: styles.nav },
        React.createElement(SourceCodeBanner, { sourceCodeUrl: sourceCodeUrl }),
        React.createElement(Author, { name: author.name, email: author.email, avatar: author.avatar }),
        React.createElement(NavLinks, { items: navItems })));
};
