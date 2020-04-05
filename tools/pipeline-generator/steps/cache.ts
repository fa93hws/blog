import { join } from 'path';
import { existsSync } from 'fs';
import { CacheActionStep, CommonStep } from '../serializer/types';

export type CacheStep = CommonStep & CacheActionStep;
export function createCacheStep({
  folder,
  id,
  repoDir,
}: {
  folder: string;
  id: string;
  repoDir: string;
}): CacheStep {
  const absPath = join(repoDir, folder);
  if (!existsSync(absPath)) {
    throw new Error(`folder ${absPath} does not exist`);
  }
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
