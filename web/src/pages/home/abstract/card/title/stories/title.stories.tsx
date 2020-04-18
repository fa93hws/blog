import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import { AbstractTitle } from '../title';

storiesOf('pages.home.abstract.card.title', module)
  .addDecorator(StoryRouter())
  .add('title', () => (
    <AbstractTitle linkTo={text('linkTo', 'target-link')}>
      {text('title', 'default title')}
    </AbstractTitle>
  ));
