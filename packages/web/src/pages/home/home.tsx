import * as React from 'react';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import type { PostProto } from '@fa93hws-blog/protos';
import type { GlobalContext } from '@utils/global-context';
import { SideBar } from '@components/sidebar/sidebar';
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
  return (
    <Box display="flex">
      <Box flex={8}>
        {props.loading ? (
          <PostListPlaceholder />
        ) : (
          <PostList posts={props.posts} />
        )}
      </Box>
      <Box flex={2} minWidth="150px">
        <SideBar />
      </Box>
    </Box>
  );
});

export function createHome({ showGlobalMsg, postService }: GlobalContext) {
  const store = new HomeStore(postService, showGlobalMsg);
  const onMount = () => store.fetchList();
  return observer(() => (
    <Home posts={store.posts} onMount={onMount} loading={store.loading} />
  ));
}
