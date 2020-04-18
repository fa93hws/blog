import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import { AbstractCard } from '../card';
import styles from './card.stories.css';

storiesOf('pages.home.abstract.card', module)
  .addDecorator(StoryRouter())
  .add('card', () => {
    const dummyParagraph =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
    return (
      <div className={styles.cardContainer}>
        <AbstractCard
          title={text('title', 'card title')}
          time={text('time', '1999年2月4日')}
          abstract={text('abstract', dummyParagraph)}
          linkTo={text('blog url', 'blog-url')}
        />
      </div>
    );
  });
