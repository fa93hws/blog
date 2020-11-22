import { makeObservable, observable, action } from 'mobx';
import type { PostService } from '@services/post/post-service';
import type { PostInList } from '@services/post/post';

export class HomeStore {
  posts: readonly PostInList[] = [];

  constructor(private readonly postService: PostService) {
    makeObservable(this, {
      posts: observable.ref,
      setPosts: action,
    });
  }

  setPosts(postList: readonly PostInList[]) {
    this.posts = postList;
  }

  async fetchList() {
    const result = await this.postService.fetchList();
    if (result.isOk) {
      this.setPosts(result.value);
    } else {
      throw result.error;
    }
  }
}
