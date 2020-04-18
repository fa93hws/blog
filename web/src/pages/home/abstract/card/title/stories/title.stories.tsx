import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import { StorySection } from 'components/storybook/storybook';
import { AbstractTitle } from '../title';

storiesOf('pages.home.abstract.card.title', module)
  .addDecorator(StoryRouter())
  .add('title', () => (
    <>
      <StorySection name="normal">
        <AbstractTitle linkTo={text('linkTo', 'target-link')}>
          {text('title', 'default title')}
        </AbstractTitle>
      </StorySection>
      <StorySection name="hover">
        <AbstractTitle linkTo={text('linkTo', 'target-link-hover')} _forceHover>
          {text('title-hover', 'hovered title')}
        </AbstractTitle>
      </StorySection>
    </>
  ));
