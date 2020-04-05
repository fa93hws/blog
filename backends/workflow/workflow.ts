import { resolve } from 'path';
import {
  Job,
  CacheStep,
  CommonStep,
  WorkFlows,
  checkoutStep,
  CheckoutStep,
  createCacheStep,
  createCommonStepCreator,
  createInstallNodeModulesStep,
} from '@fa93hws-blog/pipeline-generator';

const createCommonStep = createCommonStepCreator('backends');

type JobType = CommonStep | CacheStep | CheckoutStep;

const repoDir = resolve(__dirname, '..', '..');
const backendFolder = 'backends';
const backendCacheStep = createCacheStep({
  repoDir,
  folder: backendFolder,
  id: 'npm-cache-backends',
});
const warmUpSteps: readonly JobType[] = [
  checkoutStep,
  backendCacheStep,
  createInstallNodeModulesStep({
    id: 'npm-install-backends',
    folder: backendFolder,
    cacheStep: backendCacheStep,
  }),
];

const installJob: Job<JobType> = {
  tag: 'install',
  name: 'Install node modules',
  runsOn: 'ubuntu-latest',
  steps: warmUpSteps,
};

const lintJob: Job<JobType> = {
  tag: 'lint',
  needs: [installJob],
  name: 'Linting',
  runsOn: 'ubuntu-latest',
  steps: [
    ...warmUpSteps,
    createCommonStep({
      id: 'eslint',
      name: 'Check ESlint',
      run: 'npm run lint:ts',
    }),
    createCommonStep(
      {
        id: 'tscheck',
        name: 'Check Typescripe',
        run: 'npm run lint:ts:types',
      },
      { alwaysRun: true },
    ),
    createCommonStep(
      {
        id: 'prettier',
        name: 'Check Prettier',
        run: 'npm run format',
      },
      { alwaysRun: true },
    ),
  ],
};

const checkGeneratedJob: Job<JobType> = {
  tag: 'check-generated-files',
  name: 'Check generated files',
  runsOn: 'ubuntu-latest',
  needs: [installJob],
  steps: [
    ...warmUpSteps,
    createCommonStep({
      id: 'backends-ci',
      name: 'Regenerate backends-ci.yml',
      run: 'npm run pipeline:update',
    }),
    createCommonStep({
      id: 'check-regenerated-files',
      name: 'Check regenerated files',
      run: 'git --no-pager diff --exit-code',
    }),
  ],
};

const nextBuildJob: Job<JobType> = {
  tag: 'build',
  name: 'build',
  runsOn: 'ubuntu-latest',
  needs: [installJob],
  steps: [
    ...warmUpSteps,
    createCommonStep({
      id: 'nest-build',
      name: 'Run nest build',
      run: 'npm run build',
    }),
  ],
};

export const workFlow: WorkFlows<JobType> = {
  name: 'backends',
  on: {
    push: {
      paths: ['backends/**', '.github/workflows/backends-ci.yml'],
    },
  },
  jobs: [installJob, lintJob, checkGeneratedJob, nextBuildJob],
};
