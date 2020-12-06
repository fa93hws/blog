import * as React from 'react';
import {
  List,
  ListItem,
  Link,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Link as ReactLink } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import type { PostProto } from '@fa93hws-blog/protos';

type Summary = PostProto.ISummary;

type PostProps = {
  post: Summary;
};
const Post = React.memo(({ post }: PostProps) => (
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
      <Link component={ReactLink} to={`/post/${post.uid}`}>
        <Typography variant="subtitle1" color="primary">
          全文...
        </Typography>
      </Link>
    </CardContent>
  </Card>
));

type PostListProps = {
  posts: readonly Summary[];
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

export const PostListPlaceholder = React.memo(() => (
  <List>
    <ListItem>
      <Skeleton animation="pulse" variant="rect" height={250} width="100%" />
    </ListItem>
    <ListItem>
      <Skeleton animation="wave" variant="rect" height={250} width="100%" />
    </ListItem>
    <ListItem>
      <Skeleton animation="pulse" variant="rect" height={250} width="100%" />
    </ListItem>
    <ListItem>
      <Skeleton animation="wave" variant="rect" height={250} width="100%" />
    </ListItem>
  </List>
));
