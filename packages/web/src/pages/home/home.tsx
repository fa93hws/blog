import * as React from 'react';
import { observer } from 'mobx-react';
import type { PostService } from '@services/post/post-service';
import type { PostInList } from '@services/post/post';
import { HomeStore } from './home-store';
import { PostList } from './post-list/post-list';

type HomeProps = {
  posts: readonly PostInList[];
  onMount(): void;
};
export const Home = React.memo((props: HomeProps) => {
  React.useEffect(() => {
    props.onMount();
  }, []);
  return <PostList posts={props.posts} />;
});

export function createHome(postService: PostService) {
  const store = new HomeStore(postService);
  const onMount = () => store.fetchList();
  return observer(() => <Home posts={store.posts} onMount={onMount} />);
}
