import * as Yargs from 'yargs';
import { writeFileSync } from 'fs';
import { toYaml } from './serializer/serializer';
import { workFlow } from './workflow';

type CliArgs = {
  output: string;
};

function handler({ output }: CliArgs) {
  const yamlContent = toYaml(workFlow);
  writeFileSync(output, yamlContent, { encoding: 'utf-8' });
}

// TODO Add test to guarantee web-ci.yml is updated
export function cli() {
  Yargs.command('$0', 'generate yml for github workflow in web folder', {
    builder: (y: Yargs.Argv<any>): Yargs.Argv<CliArgs> =>
      Yargs.option('output', {
        alias: 'o',
        demand: true,
        description: 'output file path',
        type: 'string',
      }),
    handler,
  })
    .strict(true)
    .exitProcess(true)
    .demandCommand()
    .showHelpOnFail(false, 'Specify --help for available options')
    .help()
    .parse();
}
