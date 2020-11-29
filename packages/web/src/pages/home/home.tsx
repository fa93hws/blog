import * as React from 'react';
import { observer } from 'mobx-react';
import type { IPostService } from '@services/post/post-service';
import type { PostProto } from '@fa93hws-blog/protos';
import type { GlobalContext } from '@utils/global-context';
import { HomeStore } from './home-store';
import { PostList, PostListPlaceholder } from './post-list/post-list';

type Summary = PostProto.ISummary;

type HomeProps = {
  posts: readonly Summary[];
  onMount(): void;
  loading: boolean;
};
export const Home = React.memo((props: HomeProps) => {
  React.useEffect(() => {
    props.onMount();
  }, []);
  return props.loading ? (
    <PostListPlaceholder />
  ) : (
    <PostList posts={props.posts} />
  );
});

export function createHome(
  postService: IPostService,
  globalContext: GlobalContext,
) {
  const store = new HomeStore(postService, globalContext.showGlobalMsg);
  const onMount = () => store.fetchList();
  return observer(() => (
    <Home posts={store.posts} onMount={onMount} loading={store.loading} />
  ));
}
