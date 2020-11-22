import { Result } from '@badrap/result';

export interface HttpEngine {
  get<R>(url: string): Promise<Result<R>>;
}
