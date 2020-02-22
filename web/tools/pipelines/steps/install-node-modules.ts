import { CommonStep } from '../serializer/types';

export const createInstallNodeModulesStep = (
  cacheStep?: CommonStep,
): CommonStep => {
  const out: CommonStep = {
    id: 'npm-ci',
    name: 'install node modules',
    run: 'npm ci',
    'working-directory': 'web',
  };
  if (cacheStep != null) {
    out.if = `steps.${cacheStep.id}.outputs.cache-hit != 'true'`;
  }
  // if: condition,
  return out;
};
