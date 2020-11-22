import * as React from 'react';
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import type { PostInList } from '@services/post/post';

type PostProps = {
  post: PostInList;
};
const Post = React.memo(({ post }: PostProps) => (
  <Card>
    <CardContent>
      <Typography component="h2" variant="h5">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {post.date}
      </Typography>
      <Typography variant="subtitle1" paragraph>
        {post.content}
      </Typography>
      <Typography variant="subtitle1" color="primary">
        全文...
      </Typography>
    </CardContent>
  </Card>
));

type PostListProps = {
  posts: readonly PostInList[];
};
export const PostList = React.memo((props: PostListProps) => (
  <List>
    {props.posts.map((post) => (
      <ListItem key={post.uid}>
        <Post post={post} />
      </ListItem>
    ))}
  </List>
));