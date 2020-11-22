import type { AxiosInstance } from 'axios';
import { AxiosEngine } from '../axios-engine';

describe('axiosEngine', () => {
  describe('get', () => {
    it('call get with url in axios', async () => {
      const response = {
        status: 200,
        data: { foo: 'bar' },
      };
      const get = jest.fn().mockReturnValueOnce(Promise.resolve(response));
      const axios = { get };
      const engine = new AxiosEngine((axios as unknown) as AxiosInstance);
      await engine.get('url');
      expect(get).toHaveBeenCalledWith('url');
    });

    it('extract data from response if it is 2xx', async () => {
      const response = {
        status: 200,
        data: { foo: 'bar' },
      };
      const axios = {
        get: jest.fn().mockReturnValueOnce(Promise.resolve(response)),
      };
      const engine = new AxiosEngine((axios as unknown) as AxiosInstance);
      const res = await engine.get('url');
      expect(res.isOk).toEqual(true);
      expect(res.unwrap()).toEqual({ foo: 'bar' });
    });

    it('got error with status 1xx', async () => {
      const response = {
        status: 163,
        data: { foo: 'bar' },
      };
      const axios = {
        get: jest.fn().mockReturnValueOnce(Promise.resolve(response)),
      };
      const engine = new AxiosEngine((axios as unknown) as AxiosInstance);
      const res = await engine.get('url');
      expect(() => res.unwrap()).toThrowError();
    });
  });
});
