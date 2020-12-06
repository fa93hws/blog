import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createHome } from '@pages/home/home';
import type { ShowFn } from '@components/alert/alert';
import type { GlobalContext } from '@utils/global-context';
import { createService } from './create-service';
import { createPost } from './post/post';

export function createPages(showGlobalMsg: ShowFn) {
  const { postService } = createService();
  const globalContext: GlobalContext = {
    postService,
    showGlobalMsg,
  };
  const HomePage = createHome(globalContext);
  const PostPage = createPost(globalContext);

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
