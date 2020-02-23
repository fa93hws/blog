import * as Yargs from 'yargs';
import { writeFileSync } from 'fs';
import { toYaml } from './serializer/serializer';
import { workFlow } from './workflow';
function handler(_a) {
    var output = _a.output;
    var yamlContent = toYaml(workFlow);
    writeFileSync(output, yamlContent, { encoding: 'utf-8' });
}
// TODO Add test to guarantee web-ci.yml is updated
export function cli() {
    Yargs.command('$0', 'generate yml for github workflow in web folder', {
        builder: function (y) {
            return Yargs.option('output', {
                alias: 'o',
                demand: true,
                description: 'output file path',
                type: 'string',
            });
        },
        handler: handler,
    })
        .strict(true)
        .exitProcess(true)
        .demandCommand()
        .showHelpOnFail(false, 'Specify --help for available options')
        .help()
        .parse();
}
