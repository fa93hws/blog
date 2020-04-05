import { CommonStep } from '../serializer/types';

export const createInstallNodeModulesStep = ({
  id,
  folder,
  cacheStep,
}: {
  id: string;
  folder: string;
  cacheStep?: CommonStep;
}): CommonStep => {
  const out: CommonStep = {
    id,
    name: `install node modules in ${folder}`,
    run: 'npm ci',
    'working-directory': folder,
  };
  if (cacheStep != null) {
    out.if = `steps.${cacheStep.id}.outputs.cache-hit != 'true'`;
  }
  // if: condition,
  return out;
};
