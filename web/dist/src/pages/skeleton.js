import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createHomePage } from './home/home';
import { Nav } from '../components/nav/nav';
import styles from './page.css';
export var Skeleton = function (_a) {
    var LeftNav = _a.LeftNav, MainContent = _a.MainContent;
    return (React.createElement(BrowserRouter, null,
        React.createElement("div", { className: styles.container },
            React.createElement("aside", { className: styles.nav },
                React.createElement(LeftNav, null)),
            React.createElement("main", { className: styles.mainContent },
                React.createElement(MainContent, null)))));
};
export function createSkeleton() {
    var MainContent = createHomePage();
    var author = {
        name: '夏目天子',
        email: 'wjun0912@gmail.com',
        avatar: {
            img: 'https://avatars0.githubusercontent.com/u/10626756',
            alt: "author's github page",
            linkTo: 'https://github.com/fa93hws',
        },
    };
    var navLinkItems = [
        {
            text: 'Home',
            link: '/home',
        },
        {
            text: 'Archives',
            link: '/archives',
        },
        {
            text: 'Tags',
            link: '/tags',
        },
        {
            text: 'Github',
            link: '/github',
        },
        {
            text: 'Weibo',
            link: '/weibo',
        },
    ];
    var LeftNav = function () { return (React.createElement(Nav, { author: author, navItems: navLinkItems, sourceCodeUrl: "https://github.com/fa93hws/blog" })); };
    var SkeletonImpl = function () { return (React.createElement(Skeleton, { MainContent: MainContent, LeftNav: LeftNav })); };
    return SkeletonImpl;
}
