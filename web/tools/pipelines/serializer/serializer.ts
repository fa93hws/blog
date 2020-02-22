import { dump } from 'js-yaml';
import { WorkFlows, CommonStep, Job } from './types';

export function toYaml<T extends CommonStep>(obj: WorkFlows<T>) {
  // TODO Change to an immutable way
  /* eslint-disable no-param-reassign */
  obj.jobs.forEach(j => {
    if (j.needs != null) {
      j.needs = j.needs.map(s => (typeof s === 'string' ? s : s.tag));
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (obj as any).jobs = obj.jobs.reduce<Record<string, Job<T>>>((acc, cur) => {
    acc[cur.tag] = cur;
    delete cur.tag;
    return acc;
  }, {});
  return dump(obj, {
    sortKeys: true,
    styles: {
      '!!seq': '[ ... ]',
    },
    noRefs: true,
  });
}
