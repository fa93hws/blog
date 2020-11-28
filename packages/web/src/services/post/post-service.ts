import { HttpEngine } from '@services/http-engine/http-engine';
import { PostProto } from '@fa93hws-blog/protos';
import { Result } from '@badrap/result';

type SummaryList = PostProto.ISummrayList;

export interface IPostService {
  fetchList(): Promise<Result<SummaryList>>;
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
}
