import { Result } from '@badrap/result';

export interface HttpEngine {
  get<T>(url: string): Promise<Result<T>>;
}
