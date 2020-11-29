import * as React from 'react';
import { createHome } from '@pages/home/home';
import type { GlobalContext } from '@utils/global-context';
import { createService } from './create-service';

export function createPages(globalContext: GlobalContext) {
  const { postService } = createService();
  const HomePage = createHome(postService, globalContext);

  return () => <HomePage />;
}
