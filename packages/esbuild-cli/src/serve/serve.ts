import { EOL } from 'os';
import * as path from 'path';
import * as fs from 'fs';
import * as yargs from 'yargs';
import { startService, BuildOptions } from 'esbuild';
import { debounce } from 'lodash';
import { yellow } from 'chalk';

import type { Options } from '../types';
import { startDevServer } from './dev-server';
import { normalizeOptions, doBuild } from '../common';

type CliArgs = {
  // config path
  config: string;
  // port number
  port: number;
  watchDir: string;
};

function injectClientEntry(esbuildOptions: BuildOptions, port: number) {
  /* eslint-disable no-param-reassign */
  if (esbuildOptions.inject == null) {
    esbuildOptions.inject = [];
  }
  esbuildOptions.inject.push(
    path.join(__dirname, '..', '..', 'client-entry', 'client-entry.js'),
  );
  if (esbuildOptions.define == null) {
    esbuildOptions.define = {};
  }
  esbuildOptions.define['__ESBUILD_CLI_INTERNAL__.PORT'] = `'${port}'`;
  /* eslint-enable no-param-reassign */
}

function registerCleanup(callback: () => unknown) {
  process.on('uncaughtException', callback);
  process.on('SIGINT', callback);
  process.on('SIGUSR1', callback);
  process.on('SIGUSR2', callback);
  process.on('beforeExit', callback);
}

async function handler({ config, port, watchDir }: CliArgs) {
  const absConfigPath = path.isAbsolute(config)
    ? config
    : path.resolve(process.cwd(), config);
  // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
  const options: Options = require(absConfigPath);
  injectClientEntry(options.esbuildOptions, port);
  const normalizedOptions = normalizeOptions(options);

  const esbuildService = await startService();
  const esbuild = () => esbuildService.build(options.esbuildOptions);
  doBuild({
    esbuild,
    options: normalizedOptions,
  });

  const buildOutputFolder = options.esbuildOptions.outdir;
  if (buildOutputFolder == null) {
    throw new Error('outdir must be provided with serve');
  }

  const debouncedBuild = debounce(doBuild, 100);
  const io = startDevServer({ port, buildOutputFolder });

  function afterBuild() {
    io.emit('browserReload');
  }

  const normalizedWatchDir = path.isAbsolute(watchDir)
    ? watchDir
    : path.join(process.cwd(), watchDir);
  const watcher = fs.watch(normalizedWatchDir, { recursive: true }, () =>
    debouncedBuild({ esbuild, options: normalizedOptions, afterBuild }),
  );
  watcher.once('close', () => {
    console.log(yellow(`${EOL}Terminate esbuild dev server`));
    esbuildService.stop();
    io.close();
  });
  registerCleanup(() => watcher.close());
}

export const serveModule: yargs.CommandModule<unknown, CliArgs> = {
  command: 'serve',
  describe: 'serve with esbuild and auto browser refresh',
  builder: (): yargs.Argv<CliArgs> =>
    yargs
      .option('config', {
        demandOption: true,
        type: 'string',
        description: 'path to config path',
      })
      .option('port', {
        demandOption: true,
        type: 'number',
        description: 'port number',
      })
      .option('watchDir', {
        demandOption: true,
        type: 'string',
        description: 'path to watch',
      }),
  handler,
};
