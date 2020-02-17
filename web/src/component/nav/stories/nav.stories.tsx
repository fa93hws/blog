import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { createNav } from '../nav';

storiesOf('component.nav', module).add('global nav', () => {
  const Nav = createNav();
  return <Nav />;
});
