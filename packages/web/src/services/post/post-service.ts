import { HttpEngine } from '@services/http-engine/http-engine';
import { PostProto } from '@fa93hws-blog/protos';
import { Result } from '@badrap/result';

type SummaryList = PostProto.ISummrayList;
type Post = PostProto.IPost;

export interface IPostService {
  fetchList(): Promise<Result<SummaryList>>;
  // TODO Add error code for 404 not found so that page can redirect
  fetchPost(uid: string): Promise<Result<Post>>;
}

export class PostService implements IPostService {
  constructor(private readonly httpEngine: HttpEngine) {}

  async fetchList(): Promise<Result<SummaryList>> {
    const result = await this.httpEngine.get<SummaryList>('posts');
    if (result.isErr) {
      return Result.err(result.error);
    }
    const data = PostProto.SummrayList.fromObject(result.value);
    return Result.ok(data);
  }

  async fetchPost(uid: string): Promise<Result<Post>> {
    const result = await this.httpEngine.get<Post>(`posts/${uid}`);
    if (result.isErr) {
      return Result.err(result.error);
    }
    const data = PostProto.Post.fromObject(result.value);
    return Result.ok(data);
  }
}
