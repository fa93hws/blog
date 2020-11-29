import { makeObservable, observable, action } from 'mobx';
import type { IPostService } from '@services/post/post-service';
import type { PostProto } from '@fa93hws-blog/protos';

type Summary = PostProto.ISummary;
export class HomeStore {
  posts: readonly Summary[] = [];

  loading = false;

  constructor(private readonly postService: IPostService) {
    makeObservable(this, {
      posts: observable.ref,
      loading: observable.ref,
      setPosts: action,
      setLoading: action,
    });
  }

  setPosts(postList: readonly Summary[]) {
    this.posts = postList;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  async fetchList() {
    this.setLoading(true);
    const result = await this.postService.fetchList();
    if (result.isOk) {
      this.setPosts(result.value.list ?? []);
      this.setLoading(false);
    } else {
      throw result.error;
    }
  }
}
