import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import { Nav } from '../nav';
import { fakeNavLinkItems } from '../nav-links/fake/fake-links';
import styles from './nav.stories.css';
storiesOf('components.nav', module)
    .addDecorator(StoryRouter())
    .add('global nav', function () {
    var author = {
        name: text('author name', '夏目天子'),
        email: text('author email', 'wjun0912@gmail.com'),
        avatar: {
            img: text('avatar image url', 'https://avatars0.githubusercontent.com/u/10626756'),
            alt: text('avatar alt', 'alt'),
            linkTo: text('avatar link to', 'avatarLink'),
        },
    };
    var sourceCodeUrl = text('sourcecode link', 'https://github.com/fa93hws/blog');
    return (React.createElement("div", { className: styles.nav },
        React.createElement(Nav, { author: author, sourceCodeUrl: sourceCodeUrl, navItems: fakeNavLinkItems })));
});
