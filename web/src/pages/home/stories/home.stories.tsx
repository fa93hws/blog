import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { fakeBlogList } from 'services/blog-list/fake/fake-blog-list';
import StoryRouter from 'storybook-react-router';
import { HomePage } from '../home';

storiesOf('pages.home', module)
  .addDecorator(StoryRouter())
  .add('home page', () => <HomePage blogList={fakeBlogList} />);
