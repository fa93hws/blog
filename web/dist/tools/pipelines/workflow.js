var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { checkoutStep } from './steps/checkout';
import { cacheStep } from './steps/cache';
import { createInstallNodeModulesStep } from './steps/install-node-modules';
import { createCommonStep } from './steps/create-common-step';
var installJob = {
    tag: 'install',
    name: 'Install node modules',
    'runs-on': 'ubuntu-latest',
    steps: [checkoutStep, cacheStep, createInstallNodeModulesStep()],
};
var warmUpSteps = [
    checkoutStep,
    cacheStep,
    createInstallNodeModulesStep(cacheStep),
];
var lintJob = {
    tag: 'lint',
    needs: [installJob],
    name: 'Linting',
    'runs-on': 'ubuntu-latest',
    steps: __spreadArrays(warmUpSteps, [
        createCommonStep({
            id: 'eslint',
            name: 'Check ESlint',
            run: 'npm run lint:ts',
        }),
        createCommonStep({
            id: 'tscheck',
            name: 'Check Typescripe',
            run: 'npm run lint:ts:types',
        }, { alwaysRun: true }),
        createCommonStep({
            id: 'prettier',
            name: 'Check Prettier',
            run: 'npm run format',
        }, { alwaysRun: true }),
    ]),
};
var unitTestJob = {
    tag: 'unit-test',
    name: 'Unit test',
    'runs-on': 'ubuntu-latest',
    needs: [installJob],
    steps: __spreadArrays(warmUpSteps, [
        createCommonStep({
            id: 'jest',
            name: 'Run unit test',
            run: 'npm run test',
        }),
    ]),
};
var checkGeneratedJob = {
    tag: 'check-generated-files',
    name: 'Check generated files',
    'runs-on': 'ubuntu-latest',
    needs: [installJob],
    steps: __spreadArrays(warmUpSteps, [
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
    ]),
};
var webpackJob = {
    tag: 'build-webpack',
    name: 'webpack',
    'runs-on': 'ubuntu-latest',
    needs: [installJob],
    steps: __spreadArrays(warmUpSteps, [
        createCommonStep({
            id: 'webpack',
            name: 'Run webpack build',
            run: 'npm run build',
            env: {
                CI: 'true',
                DEBUG: 'webpack_options',
            },
        }),
    ]),
};
var storybookJob = {
    tag: 'storybook',
    name: 'storybook',
    'runs-on': 'ubuntu-latest',
    needs: [installJob],
    steps: __spreadArrays(warmUpSteps, [
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
    ]),
};
export var workFlow = {
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
