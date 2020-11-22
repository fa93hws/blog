import { HttpEngine } from '@services/http-engine/http-engine';
import type { PostInList } from './post';

export class PostService {
  constructor(private readonly httpEngine: HttpEngine) {}

  async fetchList() {
    return this.httpEngine.get<PostInList[]>('posts');
  }
}
