import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { StorySection } from 'components/storybook/storybook';
import { PrimaryButton, GhostButton } from '../button';
import styles from './button.stories.css';

storiesOf('components.buttons', module).add('button', () => {
  return (
    <>
      <StorySection name="Primary Button(stateless)">
        <StorySection name="small">
          <div className={styles.container}>
            <PrimaryButton>Default</PrimaryButton>
            <PrimaryButton prefixIcon="Share">With Icon</PrimaryButton>
            <PrimaryButton prefixIcon="Share" circle />
          </div>
        </StorySection>
        <StorySection name="large">
          <div className={styles.container}>
            <PrimaryButton size="large">Default</PrimaryButton>
            <PrimaryButton prefixIcon="Share" size="large">
              With Icon
            </PrimaryButton>
            <PrimaryButton prefixIcon="Share" circle size="large" />
          </div>
        </StorySection>
      </StorySection>
      <StorySection name="Ghost Button(stateless)">
        <StorySection name="small">
          <div className={styles.container}>
            <GhostButton>Default</GhostButton>
            <GhostButton prefixIcon="Share">With Icon</GhostButton>
            <GhostButton prefixIcon="Share" circle />
          </div>
        </StorySection>
        <StorySection name="large">
          <div className={styles.container}>
            <GhostButton size="large">Default</GhostButton>
            <GhostButton prefixIcon="Share" size="large">
              With Icon
            </GhostButton>
            <GhostButton prefixIcon="Share" circle size="large" />
          </div>
        </StorySection>
      </StorySection>
    </>
  );
});
