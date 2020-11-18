import * as yargs from 'yargs';

import { buildModule } from './build';
import { serveModule } from './serve/serve';

export function main() {
  yargs
    .command(buildModule)
    .command(serveModule)
    .strict(true)
    .exitProcess(true)
    .demandCommand()
    .showHelpOnFail(false, 'Specify --help for available options')
    .help()
    .parse();
}
