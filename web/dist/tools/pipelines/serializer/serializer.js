import { dump } from 'js-yaml';
export function toYaml(obj) {
    // TODO Change to an immutable way
    /* eslint-disable no-param-reassign */
    obj.jobs.forEach(function (j) {
        if (j.needs != null) {
            j.needs = j.needs.map(function (s) { return (typeof s === 'string' ? s : s.tag); });
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj.jobs = obj.jobs.reduce(function (acc, cur) {
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
