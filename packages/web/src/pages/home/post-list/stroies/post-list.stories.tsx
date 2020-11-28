import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { fakePostList } from '@services/post/fake/fake-post-service';
import { PostList } from '../post-list';

storiesOf('components.footer', module).add('Footer', () => {
  return <PostList posts={fakePostList.list ?? []} />;
});
