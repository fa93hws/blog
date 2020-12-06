import { makeObservable, observable, action } from 'mobx';
import type { IPostService } from '@services/post/post-service';
import type { PostProto } from '@fa93hws-blog/protos';
import type { ShowFn } from '@components/alert/alert';

type Post = PostProto.IPost;
export class PostStore {
  post: Post = {
    title: '',
    date: '',
    content: '',
  };

  loading = false;

  hasError = false;

  constructor(
    private readonly postService: IPostService,
    private readonly showGlobalMsg: ShowFn,
  ) {
    makeObservable(this, {
      post: observable.struct,
      loading: observable.ref,
      hasError: observable.ref,
      setPost: action,
      setLoading: action,
    });
  }

  setPost(post: Post) {
    this.post = post;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setHasError(hasError: boolean) {
    this.hasError = hasError;
  }

  async fetchPost(uid: string) {
    this.setHasError(false);
    this.setLoading(true);
    const result = await this.postService.fetchPost(uid);
    this.setLoading(false);
    if (result.isOk) {
      this.setPost(result.value);
    } else {
      this.setHasError(true);
      this.setPost({
        title: '',
        date: '',
        content: '',
      });
      this.showGlobalMsg('error', '载入博客失败');
    }
  }
}
