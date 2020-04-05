import { CommonStep } from '../serializer/types';

export function createCommonStep(
  step: CommonStep,
  {
    inWeb = true,
    alwaysRun = false,
  }: {
    inWeb?: boolean;
    alwaysRun?: boolean;
  } = {},
): CommonStep {
  const out = { ...step };
  if (inWeb) {
    out['working-directory'] = 'web';
  }
  if (alwaysRun) {
    out.if = 'always()';
  }
  return out;
}
