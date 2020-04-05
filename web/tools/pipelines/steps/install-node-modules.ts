import { CommonStep } from '../serializer/types';

export const createInstallNodeModulesStep = (
  cacheSteps: readonly CommonStep[],
): CommonStep => {
  const out: CommonStep = {
    id: 'npm-ci',
    name: 'install node modules',
    run: 'npm ci',
    'working-directory': 'web',
  };
  if (cacheSteps.length > 0) {
    const conditions = cacheSteps.map(
      step => `steps.${step.id}.outputs.cache-hit != 'true'`,
    );
    out.if = conditions.join(' && ');
  }
  return out;
};
