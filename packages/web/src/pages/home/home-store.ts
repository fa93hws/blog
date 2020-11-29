import { makeObservable, observable, action } from 'mobx';
import type { IPostService } from '@services/post/post-service';
import type { PostProto } from '@fa93hws-blog/protos';
import type { ShowFn } from '@components/alert/alert';

type Summary = PostProto.ISummary;
export class HomeStore {
  posts: readonly Summary[] = [];

  loading = false;

  constructor(
    private readonly postService: IPostService,
    private readonly showGlobalMsg: ShowFn,
  ) {
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
    this.setLoading(false);
    if (result.isOk) {
      this.setPosts(result.value.list ?? []);
    } else {
      this.setPosts([]);
      this.showGlobalMsg('error', '载入博客列表失败');
    }
  }
}
