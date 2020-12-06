import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import type { PostProto } from '@fa93hws-blog/protos';
import { Post, PostLoading } from '../post';

storiesOf('pages.post', module)
  .add('Post', () => {
    const title = text('title', 'title');
    const date = text('date', '1999-02-04');
    const content = text(
      'content',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam velit arcu, lacinia a risus ut, congue maximus quam. Quisque at porttitor libero. Nullam venenatis tincidunt commodo. Vestibulum porttitor, turpis sed varius vulputate, elit est iaculis nisi, eu fringilla mauris orci ac libero. Ut volutpat dapibus felis vitae lobortis. Aliquam condimentum nisi at neque ornare pulvinar. Curabitur aliquet sapien auctor, venenatis purus in, malesuada sapien. ',
    );
    const post: PostProto.IPost = {
      title,
      date,
      content,
    };
    return <Post post={post} />;
  })
  .add('Post(Loading)', () => {
    return <PostLoading />;
  });
