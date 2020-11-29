import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { fakePostList } from '@services/post/fake/fake-post-service';
import { PostList, PostListPlaceholder } from '../post-list';

storiesOf('pages.home.post-list', module)
  .add('PostList', () => {
    return <PostList posts={fakePostList.list ?? []} />;
  })
  .add('PostList(Loading)', () => {
    return <PostListPlaceholder />;
  });
