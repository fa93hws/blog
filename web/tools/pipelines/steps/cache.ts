import { CacheActionStep, CommonStep } from '../serializer/types';

export type CacheStep = CommonStep & CacheActionStep;
export function createCacheStep({
  id,
  folder,
}: {
  id: string;
  folder: string;
}) {
  return {
    id,
    uses: 'actions/cache@v1',
    name: `fetch node modules in ${folder}`,
    with: {
      path: `${folder}/node_modules`,
      // eslint-disable-next-line no-template-curly-in-string
      key: `\${{ runner.os }}-npm-\${{ hashFiles('${folder}/package-lock.json') }}`,
    },
  };
}
