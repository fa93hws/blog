import Axios from 'axios';
import { AxiosEngine } from '@services/http-engine/axios-engine';
import { PostService, IPostService } from '@services/post/post-service';
import { FakePostService } from '@services/post/fake/fake-post-service';

type Services = {
  postService: IPostService;
};

function createRealService(): Services {
  const axios = Axios.create({
    baseURL: '/api/v1',
  });
  const axiosEngine = new AxiosEngine(axios);
  const postService = new PostService(axiosEngine);
  return { postService };
}

function createFakeService(): Services {
  const postService = new FakePostService();
  return { postService };
}

export function createService() {
  return process.env.USE_FAKE === 'true'
    ? createFakeService()
    : createRealService();
}
