import Axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import { Result } from '@badrap/result';

import type { HttpEngine } from './http-engine';

export class AxiosEngine implements HttpEngine {
  private readonly axios: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axios = Axios.create(config);
  }

  get<T>(url: string): Promise<Result<T>> {
    return new Promise((resolve) => {
      this.axios
        .get(url)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            resolve(Result.ok(res.data));
          } else {
            resolve(Result.err(new Error(res.status.toString())));
          }
        })
        .catch((e) => {
          resolve(Result.err(e));
        });
    });
  }
}
