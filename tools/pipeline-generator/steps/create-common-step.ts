import { CommonStep } from '../serializer/types';

export function createCommonStepCreator(workingDirectory: string) {
  return function (step: CommonStep, {
    alwaysRun = false,
  } : { alwaysRun?: boolean } = {}): CommonStep {
    const out: CommonStep = { ...step };
    out["working-directory"] = workingDirectory;
    if (alwaysRun) {
      out.if = 'always()';
    }
    return out;
  }
}
