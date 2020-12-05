import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { fakePostList } from '@services/post/fake/fake-post-service';
import StoryRouter from 'storybook-react-router';
import { PostList, PostListPlaceholder } from '../post-list';

storiesOf('pages.home.post-list', module)
  .addDecorator(StoryRouter())
  .add('PostList', () => {
    return <PostList posts={fakePostList.list ?? []} />;
  })
  .add('PostList(Loading)', () => {
    return <PostListPlaceholder />;
  });
