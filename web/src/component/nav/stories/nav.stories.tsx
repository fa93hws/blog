import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Nav } from '../nav';

storiesOf('component.nav', module).add('global nav', () => {
  const author = {
    name: text('author name', '夏目天子'),
    email: text('author email', 'wjun0912@gmail.com'),
    avatar: {
      img: text(
        'avatar image url',
        'https://avatars0.githubusercontent.com/u/10626756',
      ),
      alt: text('avatar alt', 'alt'),
      linkTo: text('avatar link to', 'avatarLink'),
    },
  };

  return (
    <div style={{ display: 'flex' }}>
      <Nav author={author} />
    </div>
  );
});
