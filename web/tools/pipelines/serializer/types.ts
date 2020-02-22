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
  'runs-on': readonly string[] | string;
  steps: readonly T[];
  needs?: readonly (Job<CommonStep> | string)[];
};

export type WorkFlows<T extends CommonStep> = {
  name: string;
  on: readonly string[] | string;
  jobs: readonly Job<T>[];
};
