import * as React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import type { PostProto } from '@fa93hws-blog/protos';
import type { GlobalContext } from '@utils/global-context';
import { PostStore } from './post-store';

export const Post = React.memo(({ post }: { post: PostProto.IPost }) => (
  <Box width="100%">
    <Card>
      <CardContent>
        <Typography component="h2" variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {post.date}
        </Typography>
        <Typography variant="subtitle1" paragraph>
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  </Box>
));

const useLoadingStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

export const PostLoading = withTheme(
  React.memo(() => {
    const styles = useLoadingStyles();
    return (
      <Box width="100%">
        <Card>
          <CardContent classes={{ root: styles.card }}>
            <Skeleton
              animation="pulse"
              variant="rect"
              height="2em"
              width="20em"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              height="1.5em"
              width="12em"
            />
            <Skeleton
              animation="pulse"
              variant="rect"
              height={250}
              width="100%"
            />
          </CardContent>
        </Card>
      </Box>
    );
  }),
);

type RouterParam = {
  uid: string;
};

export function createPost({ showGlobalMsg, postService }: GlobalContext) {
  const postStore = new PostStore(postService, showGlobalMsg);
  return observer(() => {
    const { uid } = useParams<RouterParam>();
    React.useEffect(() => {
      postStore.fetchPost(uid);
    }, [uid]);
    return postStore.loading ? <PostLoading /> : <Post post={postStore.post} />;
  });
}
