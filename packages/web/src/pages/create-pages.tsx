import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createHome } from '@pages/home/home';
import type { GlobalContext } from '@utils/global-context';
import { createService } from './create-service';
import { createPost } from './post/post';

export function createPages(globalContext: GlobalContext) {
  const { postService } = createService();
  const HomePage = createHome(postService, globalContext);
  const PostPage = createPost(postService, globalContext);

  return React.memo(() => (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home">
        <HomePage />
      </Route>
      <Route exact path="/post/:uid">
        <PostPage />
      </Route>
    </Switch>
  ));
}
