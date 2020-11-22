import createMockInstance from 'jest-create-mock-instance';
import { AxiosEngine } from '@services/http-engine/axios-engine';
import { Result } from '@badrap/result';
import { PostService } from '../post-service';

describe('PostService', () => {
  describe('fetchList', () => {
    const dummyFailure = Result.err(new Error('foo'));

    it('call service with url=posts', async () => {
      const httpEngine = createMockInstance(AxiosEngine);
      httpEngine.get.mockReturnValueOnce(Promise.resolve(dummyFailure));
      const service = new PostService(httpEngine);
      await service.fetchList();
      expect(httpEngine.get).toHaveBeenCalledWith('posts');
    });

    it('return error if httpEngine returns error', async () => {
      const httpEngine = createMockInstance(AxiosEngine);
      httpEngine.get.mockReturnValueOnce(Promise.resolve(dummyFailure));
      const service = new PostService(httpEngine);
      const result = await service.fetchList();
      expect(() => result.unwrap()).toThrowError('foo');
    });
  });
});
