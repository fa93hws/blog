import * as Yargs from 'yargs';
import { writeFileSync, existsSync } from 'fs';
import { isAbsolute, join } from 'path'
import { toYaml } from './serializer/serializer';

type CliArgs = {
  output: string;
  workflowFile: string;
};

function resolveWorkflowFile({ cwd, workflowFile }: {
  cwd: string;
  workflowFile: string;
}) {
  if (isAbsolute(workflowFile)) {
    return workflowFile;
  }
  return join(cwd, workflowFile);
}

function handler({ output, workflowFile }: CliArgs) {
  const filePath = resolveWorkflowFile({ cwd: process.cwd(), workflowFile })
  if (!existsSync(filePath)) {
    throw new Error(`workflow file ${filePath} does not exist`);
  }
  const { workFlow } = require(filePath);
  const yamlContent = toYaml(workFlow);
  writeFileSync(output, yamlContent, { encoding: 'utf-8' });
}

export function cli() {
  Yargs.command('$0', 'generate yml for github workflow in web folder', {
    builder: (): Yargs.Argv<CliArgs> =>
      Yargs.option('output', {
        alias: 'o',
        demand: true,
        description: 'output file path',
        type: 'string',
      }).option('workflowFile', {
        demand: true,
        description: 'path to workflow file',
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
