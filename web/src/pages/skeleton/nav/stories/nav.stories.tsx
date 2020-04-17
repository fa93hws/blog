import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import { StorySection } from '../../../../components/storybook/storybook';
import { Nav } from '../nav';
import { fakeNavLinkItems } from '../nav-links/fake/fake-links';
import styles from './nav.stories.css';

storiesOf('pages.skeleton.nav', module)
  .addDecorator(StoryRouter())
  .add('global nav', () => {
    const author = {
      name: text('author name', '夏目天子'),
      email: text('author email', 'wjun0912@gmail.com'),
      avatar: {
        img: text(
          'avatar image url',
          'https://avatars0.githubusercontent.com/u/10626756',
        ),
        alt: text('avatar alt', 'alt'),
        linkTo: text('avatar link to', 'avatarLink'),
      },
    };
    const sourceCodeUrl = text(
      'sourcecode link',
      'https://github.com/fa93hws/blog',
    );
    const NavStory = () => (
      <Nav
        author={author}
        sourceCodeUrl={sourceCodeUrl}
        navItems={fakeNavLinkItems}
      />
    );

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
