import { makeObservable, observable, action } from 'mobx';
import type { IPostService } from '@services/post/post-service';
import type { PostProto } from '@fa93hws-blog/protos';

type Summary = PostProto.ISummary;
export class HomeStore {
  posts: readonly Summary[] = [];

  constructor(private readonly postService: IPostService) {
    makeObservable(this, {
      posts: observable.ref,
      setPosts: action,
    });
  }

  setPosts(postList: readonly Summary[]) {
    this.posts = postList;
  }

  async fetchList() {
    const result = await this.postService.fetchList();
    if (result.isOk) {
      this.setPosts(result.value.list ?? []);
    } else {
      throw result.error;
    }
  }
}
