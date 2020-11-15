import * as React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { StorySection } from 'components/storybook/storybook';
import { Nav } from '../nav';
import { fakeNavLinkItems } from '../nav-links/fake/fake-links';
import styles from './nav.stories.css';

storiesOf('pages.skeleton.nav', module)
  .addDecorator(StoryRouter())
  .add('Nav', () => {
    const NavStory = () => <Nav navItems={fakeNavLinkItems} />;

    return (
      <>
        <StorySection name="Short">
          <div className={styles.shortNav}>
            <NavStory />
          </div>
        </StorySection>
        <StorySection name="Full Height">
          <div className={styles.tallNav}>
            <NavStory />
          </div>
        </StorySection>
      </>
    );
  });
