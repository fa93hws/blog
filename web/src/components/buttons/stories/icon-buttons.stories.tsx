import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Cross, Menu, SinaWeibo } from 'components/icons/icons';
import { StorySection } from 'components/storybook/storybook';
import { select, boolean } from '@storybook/addon-knobs';
import { IconButton } from '../icon-button';
import styles from './icon-button.stories.css';
import { RippleStore } from '../ripple/ripple-store';

function createStore(forceRipple: boolean) {
  if (!forceRipple) {
    return undefined;
  }
  const store = new RippleStore();
  store.setRipple({ top: 10, left: 10 });
  return store;
}

function createStorySection({
  name,
  circle,
  forceRipple,
}: {
  name: string;
  circle: boolean;
  forceRipple: boolean;
}) {
  const CrossIcon = () => <Cross size="small" />;
  const MenuIcon = () => <Menu size="large" />;
  return () => (
    <StorySection name={name} stripeBackground="dark">
      <div className={styles.container}>
        <IconButton
          Icon={CrossIcon}
          size="small"
          circle={circle}
          store={createStore(forceRipple)}
          useAnimation={!forceRipple}
        />
        <IconButton
          Icon={CrossIcon}
          size="large"
          circle={circle}
          store={createStore(forceRipple)}
          useAnimation={!forceRipple}
        />
        <IconButton
          Icon={MenuIcon}
          size="large"
          circle={circle}
          store={createStore(forceRipple)}
          useAnimation={!forceRipple}
        />
      </div>
    </StorySection>
  );
}

storiesOf('components.buttons', module).add('button', () => {
  const Icon = () => <SinaWeibo size="small" />;
  const size = select(
    'button size',
    {
      small: 'small',
      large: 'large',
    },
    'small',
  );

  const StoriesWithoutRipple = createStorySection({
    name: 'Icon Button(stateless)',
    circle: true,
    forceRipple: false,
  });
  const StoriesWithRipple = createStorySection({
    name: 'Icon Button(stateless-ripple)',
    circle: true,
    forceRipple: true,
  });
  const RectangleStoriesWithRipple = createStorySection({
    name: 'Icon Button(stateless-rectangle-ripple)',
    circle: false,
    forceRipple: true,
  });
  return (
    <>
      <StorySection name="Icon Button(stateful)" stripeBackground="dark">
        <div className={styles.container}>
          <IconButton
            Icon={Icon}
            size={size}
            circle={boolean('circle', false)}
            onClick={action('button clicked')}
          />
        </div>
      </StorySection>
      <StoriesWithoutRipple />
      <StoriesWithRipple />
      <RectangleStoriesWithRipple />
    </>
  );
});
