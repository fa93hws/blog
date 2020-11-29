import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Footer } from '../footer';

storiesOf('components.footer', module)
  .addParameters({ percy: { skip: true } })
  .add('Footer', () => <Footer />);
