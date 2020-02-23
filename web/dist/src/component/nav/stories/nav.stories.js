import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import { Nav } from '../nav';
addDecorator(withKnobs);
addDecorator(StoryRouter());
storiesOf('component.nav', module).add('global nav', function () {
    var author = {
        name: text('author name', '夏目天子'),
        email: text('author email', 'wjun0912@gmail.com'),
        avatar: {
            img: text('avatar image url', 'https://avatars0.githubusercontent.com/u/10626756'),
            alt: text('avatar alt', 'alt'),
            linkTo: text('avatar link to', 'avatarLink'),
        },
    };
    return (React.createElement("div", { style: { display: 'flex' } },
        React.createElement(Nav, { author: author })));
});
