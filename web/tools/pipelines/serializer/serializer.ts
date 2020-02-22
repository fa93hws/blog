import { dump } from 'js-yaml';
import { WorkFlows, CommonStep } from './types';

export function toYaml<T extends CommonStep>(obj: WorkFlows<T>) {
  // TODO Change to an immutable way
  /* eslint-disable no-param-reassign */
  Object.values(obj.jobs).forEach(j => {
    if (j.needs != null) {
      j.needs = j.needs.map(s => (typeof s === 'string' ? s : s.tag));
    }
  });
  Object.values(obj.jobs).forEach(j => delete j.tag);
  return dump(obj, {
    styles: {
      '!!seq': '[ ... ]',
    },
    noRefs: true,
  });
}
