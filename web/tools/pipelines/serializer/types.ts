export type CheckoutActionStep = {
  uses: 'actions/checkout@v1';
};

export type CacheActionStep = {
  uses: 'actions/cache@v1';
  with: {
    path: string;
    key: string;
  };
};

export type S3ActionStep = {
  uses: 'jakejarvis/s3-sync-action@v0.5.1';
  with: {
    args: string;
  };
};

export type CodeCovStep = {
  uses: 'codecov/codecov-action@v1';
  with: {
    token: string;
    file: string;
    yml: string;
    flags: string;
  };
};

export type CommonStep = {
  name: string;
  id: string;
  'working-directory'?: string;
  env?: Record<string, string>;
  run?: string;
  if?: string;
};

export type Job<T extends CommonStep> = {
  tag: string;

  name: string;
  runsOn: readonly string[] | string;
  steps: readonly T[];
  needs?: readonly Job<CommonStep>[];
};

export type WorkFlows<T extends CommonStep> = {
  name: string;
  on: any;
  jobs: readonly Job<T>[];
};
