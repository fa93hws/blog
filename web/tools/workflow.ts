import { resolve } from 'path';
import {
  Job,
  CacheStep,
  CommonStep,
  S3SyncStep,
  WorkFlows,
  checkoutStep,
  CheckoutStep,
  createCacheStep,
  createDeploySteps,
  createCodeCovStep,
  createCommonStepCreator,
  createInstallNodeModulesStep,
} from '@fa93hws-blog/pipeline-generator';

const createCommonStep = createCommonStepCreator('web');

type JobType = CommonStep | CacheStep | CheckoutStep;
type JobWithDeployment = JobType | S3SyncStep;

const repoDir = resolve(__dirname, '..', '..');
const webFolder = 'web';
const webCacheStep = createCacheStep({
  repoDir,
  folder: webFolder,
  id: 'npm-cache-web',
});
const warmUpSteps: readonly JobType[] = [
  checkoutStep,
  webCacheStep,
  createInstallNodeModulesStep({
    id: 'npm-install-web',
    folder: webFolder,
    cacheStep: webCacheStep,
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

const unitTestJob: Job<JobType> = {
  tag: 'unit-test',
  name: 'Unit test',
  runsOn: 'ubuntu-latest',
  needs: [installJob],
  steps: [
    ...warmUpSteps,
    createCommonStep({
      id: 'jest',
      name: 'Run unit test',
      run: 'npm run test -- --coverage',
    }),
    createCodeCovStep({
      file: './coverage/**/*',
      yml: './codecov.yml',
      name: 'web_unittest',
    }),
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
      id: 'web-ci',
      name: 'Regenerate web-ci.yml',
      run: 'npm run pipeline:update',
    }),
    createCommonStep({
      id: 'check-regenerated-files',
      name: 'Check regenerated files',
      run: 'git --no-pager diff --exit-code',
    }),
  ],
};

const webpackJob: Job<JobType> = {
  tag: 'build-webpack',
  name: 'webpack',
  runsOn: 'ubuntu-latest',
  needs: [installJob],
  steps: [
    ...warmUpSteps,
    createCommonStep({
      id: 'webpack',
      name: 'Run webpack build',
      run: 'npm run build',
      env: {
        CI: 'true',
        DEBUG: 'webpack_options',
      },
    }),
    ...createDeploySteps({
      sourceDir: 'web/dist/blog',
      app: 'blog',
    }),
  ],
};

const storybookJob: Job<JobWithDeployment> = {
  tag: 'storybook',
  name: 'storybook',
  runsOn: 'ubuntu-latest',
  needs: [installJob],
  steps: [
    ...warmUpSteps,
    createCommonStep({
      id: 'storybook',
      name: 'Run storybook build',
      run: 'npm run storybook:build',
      env: {
        DEBUG: 'storybook_config',
      },
    }),
    ...createDeploySteps({
      sourceDir: 'web/dist/storybook',
      app: 'storybook',
    }),
    createCommonStep({
      id: 'percy-storybook',
      name: 'Run percy on storybook',
      run: 'npm run percy:storybook',
      env: {
        // eslint-disable-next-line no-template-curly-in-string
        PERCY_TOKEN: '${{ secrets.PERCY_TOKEN }}',
      },
    }),
  ],
};

export const workFlow: WorkFlows<JobType> = {
  name: 'web',
  on: {
    push: {
      paths: ['web/**', '.github/workflows/web-ci.yml'],
    },
  },
  jobs: [
    installJob,
    lintJob,
    unitTestJob,
    checkGeneratedJob,
    webpackJob,
    storybookJob,
  ],
};
