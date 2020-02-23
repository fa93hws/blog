import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { createHomePage } from '../home';
storiesOf('pages.home', module).add('global nav', function () {
    var Home = createHomePage();
    return React.createElement(Home, null);
});
