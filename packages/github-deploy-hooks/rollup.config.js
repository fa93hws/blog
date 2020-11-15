import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import builtinModules from 'builtin-modules';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'target',
    format: 'cjs',
  },
  external: [...builtinModules, './private-key'],
  plugins: [
    json(),
    typescript(),
    resolve(),
    commonJS({
      include: 'node_modules/**',
    }),
  ],
};
