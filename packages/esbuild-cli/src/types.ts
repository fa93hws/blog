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
