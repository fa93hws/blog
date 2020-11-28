import Axios from 'axios';
import * as React from 'react';
import { createHome } from '@pages/home/home';
import { AxiosEngine } from '@services/http-engine/axios-engine';
import { PostService } from '@services/post/post-service';

export function createPages() {
  const axios = Axios.create({
    baseURL: '/api/v1',
  });
  const axiosEngine = new AxiosEngine(axios);
  const postService = new PostService(axiosEngine);
  const HomePage = createHome(postService);

  return () => <HomePage />;
}
