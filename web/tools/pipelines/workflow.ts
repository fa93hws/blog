import { Job, CommonStep, WorkFlows } from './serializer/types';
import { checkoutStep, CheckoutStep } from './steps/checkout';
import { CacheStep, cacheStep } from './steps/cache';
import { createInstallNodeModulesStep } from './steps/install-node-modules';
import { createCommonStep } from './steps/create-common-step';

type JobType = CommonStep | CacheStep | CheckoutStep;
const installJob: Job<JobType> = {
  tag: 'install',
  name: 'Install node modules',
  'runs-on': 'ubuntu-latest',
  steps: [checkoutStep, cacheStep, createInstallNodeModulesStep()],
};

const warmUpSteps: readonly JobType[] = [
  checkoutStep,
  cacheStep,
  createInstallNodeModulesStep(cacheStep),
];

const lintJob: Job<JobType> = {
  tag: 'lint',
  needs: [installJob],
  name: 'Linting',
  'runs-on': 'ubuntu-latest',
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
  'runs-on': 'ubuntu-latest',
  needs: [installJob],
  steps: [
    ...warmUpSteps,
    createCommonStep({
      id: 'jest',
      name: 'Run unit test',
      run: 'npm run test',
    }),
  ],
};

const checkGeneratedJob: Job<JobType> = {
  tag: 'check-generated-files',
  name: 'Check generated files',
  'runs-on': 'ubuntu-latest',
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
  'runs-on': 'ubuntu-latest',
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
  ],
};

const storybookJob: Job<JobType> = {
  tag: 'storybook',
  name: 'storybook',
  'runs-on': 'ubuntu-latest',
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
  on: ['push'],
  jobs: [
    installJob,
    lintJob,
    unitTestJob,
    checkGeneratedJob,
    webpackJob,
    storybookJob,
  ],
};
