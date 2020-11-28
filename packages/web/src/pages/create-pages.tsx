import * as React from 'react';
import { createHome } from '@pages/home/home';
import { createService } from './create-service';

export function createPages() {
  const { postService } = createService();
  const HomePage = createHome(postService);

  return () => <HomePage />;
}
