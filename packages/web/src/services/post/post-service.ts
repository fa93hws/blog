import { HttpEngine } from '@services/http-engine/http-engine';
import { PostProto } from '@fa93hws-blog/protos';
import { Result } from '@badrap/result';

type Summary = PostProto.ISummary;
type SummaryList = PostProto.ISummrayList;

export class PostService {
  constructor(private readonly httpEngine: HttpEngine) {}

  async fetchList(): Promise<Result<SummaryList>> {
    const result = await this.httpEngine.get<PostProto.ISummrayList>('posts');
    if (result.isErr) {
      return Result.err(result.error);
    }
    const data = PostProto.SummrayList.fromObject(result.value);
    return Result.ok(data);
  }
}
