import { dump } from 'js-yaml';
import { WorkFlows, CommonStep } from './types';

// function processArray<T>(target: T | readonly T[]) {
//   return Array.isArray(target) ? `[${target.join(', ')}]` : target;
// }

export function toYaml<T extends CommonStep>(obj: WorkFlows<T>) {
  /* eslint-disable no-param-reassign */
  Object.values(obj.jobs).forEach(j => {
    if (j.needs != null) {
      j.needs = j.needs.map(s => (typeof s === 'string' ? s : s.tag));
    }
    // j['runs-on'] = processArray(j['runs-on']);
  });
  return dump(obj, {
    styles: {
      '!!seq': '[ ... ]',
    },
    noRefs: true,
  });
}
