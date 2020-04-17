import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { Header } from '../header';

storiesOf('pages.skeleton.header', module).add(
  'global header (stateful)',
  () => {
    const showShortBarTitle = boolean('showShortBarTitle', false);
    const icon = select(
      'iconType',
      {
        cross: 'cross',
        menu: 'menu',
      },
      'cross',
    );
    return (
      <Header
        showShortBarTitle={showShortBarTitle}
        onIconClicked={action('icon clicked')}
        icon={icon}
      />
    );
  },
);

storiesOf(
  'pages.skeleton.header',
  module,
).add('global header (stateless - title displayed)', () => (
  <Header
    showShortBarTitle={true}
    onIconClicked={action('icon clicked')}
    icon="cross"
  />
));
