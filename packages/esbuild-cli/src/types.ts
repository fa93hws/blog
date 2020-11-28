import type { BuildOptions } from 'esbuild';

export type Options = {
  esbuildOptions: BuildOptions;

  mute?: boolean;
  hashFile?: boolean;
  htmlOptions?: {
    minify: boolean;
    entry: string;
  } | null;
};

export type DevOptions = Options & {
  port: number;
  watchDir: string;
  proxy?: Record<string, string>;
};
