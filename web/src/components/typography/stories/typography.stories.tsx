import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { StorySection } from 'components/storybook/storybook';
import { Title } from '../typography';

storiesOf('components.typography', module).add('typography', () => (
  <StorySection name="Title">
    <Title.Large>Title Large </Title.Large>
    <Title.Medium>Title Medium </Title.Medium>
    <Title.Small>Title Small </Title.Small>
  </StorySection>
));
