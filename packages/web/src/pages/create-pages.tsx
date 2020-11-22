import * as React from 'react';
import { createHome } from '@pages/home/home';
import { AxiosEngine } from '@services/http-engine/axios-engine';
import { PostService } from '@services/post/post-service';

export function createPages() {
  const axiosEngine = new AxiosEngine({
    baseURL: 'http://localhost:3000/api/v1',
  });
  const postService = new PostService(axiosEngine);
  const HomePage = createHome(postService);

  return () => <HomePage />;
}
