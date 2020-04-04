import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Title } from '../typography';
import { StorySection } from '../../storybook/storybook';

storiesOf('components.typography', module).add('typography', () => (
  <StorySection name="Title">
    <Title.Large>Title Large </Title.Large>
    <Title.Medium>Title Medium </Title.Medium>
    <Title.Small>Title Small </Title.Small>
  </StorySection>
));
