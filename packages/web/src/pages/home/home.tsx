import * as React from 'react';
import { observer } from 'mobx-react';
import type { IPostService } from '@services/post/post-service';
import type { PostProto } from '@fa93hws-blog/protos';
import { HomeStore } from './home-store';
import { PostList } from './post-list/post-list';

type Summary = PostProto.ISummary;

type HomeProps = {
  posts: readonly Summary[];
  onMount(): void;
};
export const Home = React.memo((props: HomeProps) => {
  React.useEffect(() => {
    props.onMount();
  }, []);
  return <PostList posts={props.posts} />;
});

export function createHome(postService: IPostService) {
  const store = new HomeStore(postService);
  const onMount = () => store.fetchList();
  return observer(() => <Home posts={store.posts} onMount={onMount} />);
}
