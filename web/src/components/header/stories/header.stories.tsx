import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Header } from '../header';

storiesOf('components.header', module).add('global header (stateful)', () => {
  const showShortBarTitle = boolean('showShortBarTitle', false);
  return (
    <Header
      showShortBarTitle={showShortBarTitle}
      onCloseClicked={action('close clicked')}
    />
  );
});

storiesOf(
  'components.header',
  module,
).add('global header (stateless - title displayed)', () => (
  <Header showShortBarTitle={true} onCloseClicked={action('close clicked')} />
));
