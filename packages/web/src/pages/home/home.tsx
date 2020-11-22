import * as React from 'react';
import { fakePostList } from '@services/post/fake/post-list';
import { PostList } from './post-list/post-list';

export const Home = React.memo(() => <PostList posts={fakePostList} />);
