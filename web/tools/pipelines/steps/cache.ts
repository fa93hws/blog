import { CacheActionStep, CommonStep } from '../serializer/types';

export type CacheStep = CommonStep & CacheActionStep;
export const cacheStep: CacheStep = {
  id: 'cache-npm',
  uses: 'actions/cache@v1',
  name: 'fetch node modules',
  with: {
    path: 'web/node_modules',
    // eslint-disable-next-line no-template-curly-in-string
    key: "${{ runner.os }}-npm-${{ hashFiles('web/package-lock.json') }}",
  },
};
