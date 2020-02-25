import { dump } from 'js-yaml';
import { WorkFlows, CommonStep, Job } from './types';

type OutputJob<T extends CommonStep> = Omit<
  Job<T>,
  'needs' | 'tag' | 'runsOn'
> & {
  needs?: readonly string[];
  'runs-on': Job<T>['runsOn'];
};
type OutputWorkFlows<T extends CommonStep> = Omit<WorkFlows<T>, 'jobs'> & {
  jobs: Record<string, OutputJob<T>>;
};

function uniformJob<T extends CommonStep>(job: Job<T>): OutputJob<T> {
  const out: OutputJob<T> = {
    name: job.name,
    'runs-on': job.runsOn,
    steps: job.steps,
  };
  if (job.needs != null) {
    out.needs = job.needs.map(s => s.tag);
  }
  return out;
}

function transformToOutput<T extends CommonStep>(
  obj: WorkFlows<T>,
): OutputWorkFlows<T> {
  const jobs = obj.jobs.reduce<OutputWorkFlows<T>['jobs']>((acc, cur) => {
    acc[cur.tag] = uniformJob(cur);
    return acc;
  }, {});
  return {
    name: obj.name,
    on: obj.on,
    jobs,
  };
}

export function toYaml<T extends CommonStep>(obj: WorkFlows<T>) {
  return dump(transformToOutput(obj), {
    sortKeys: true,
    lineWidth: 1000,
    styles: {
      '!!seq': '[ ... ]',
    },
    noRefs: true,
  });
}
