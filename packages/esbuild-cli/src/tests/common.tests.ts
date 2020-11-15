import * as path from 'path';
import { buildSync } from 'esbuild';
import * as rimraf from 'rimraf';
import { TextEncoder } from 'util';

import { hashOutputs, generateHtml, copyAssets, doBuild } from '../common';

describe('hashOutputs', () => {
  const enc = new TextEncoder();

  it('hash the filename with its content by md5', () => {
    const text = '123';
    const contents = enc.encode(text);
    const outputs = [
      {
        path: path.join('a', 'b', 'c', 'd.js'),
        text,
        contents,
      },
      {
        path: path.join('b', 'e', 'd.sss.css'),
        text,
        contents,
      },
    ];
    const hashedOutput = hashOutputs(outputs);
    expect(hashedOutput).toEqual([
      {
        path: path.join('a', 'b', 'c', '202cb962ac59075b.js'),
        contents,
        text,
      },
      {
        path: path.join('b', 'e', '202cb962ac59075b.css'),
        contents,
        text,
      },
    ]);
  });

  it('will not hash the filename for font file', () => {
    const text = '123';
    const contents = enc.encode(text);
    const outputs = [
      {
        path: path.join('a', 'b', 'c', 'd.woff'),
        text,
        contents,
      },
      {
        path: path.join('b', 'e', 'd.sss.woff2'),
        text,
        contents,
      },
    ];
    const hashedOutput = hashOutputs(outputs);
    expect(hashedOutput).toEqual(outputs);
  });
});

describe('generateHtml', () => {
  it('injects files into template', () => {
    const outdir = path.join(__dirname, 'fixtures');
    const templatePath = path.join(outdir, 'baz.ejs');
    const files = [
      path.join(outdir, 'foo', 'a.js'),
      path.join(outdir, 'b.css'),
      path.join(outdir, 'c.js'),
      path.join(outdir, 'bar', 'd.css'),
    ];

    const existsSync = () => true;
    const writeFileSync = jest.fn();

    generateHtml({
      options: { entry: templatePath, minify: true },
      files,
      outdir,
      existsSync,
      writeFileSync,
    });

    expect(writeFileSync.mock.calls[0][1].toString()).toEqual(
      [
        `<link rel=stylesheet href=b.css>`,
        `<link rel=stylesheet href=${path.join('bar', 'd.css')}>`,
        `<script src=${path.join('foo', 'a.js')}></script>`,
        `<script src=c.js></script>`,
      ].join(''),
    );
    expect(writeFileSync.mock.calls[0][0]).toEqual(
      path.join(outdir, 'index.html'),
    );
  });
});

describe('copyAssets', () => {
  const targetFolder = path.join(__dirname, 'fixtures', 'target');
  beforeEach(() => {
    rimraf.sync(targetFolder);
  });
  afterEach(() => {
    rimraf.sync(targetFolder);
  });
  it('copy the files in the directory only', () => {
    const copyFileSync = jest.fn();
    const from = path.join(__dirname, 'fixtures', 'bar');
    copyAssets({
      from,
      to: targetFolder,
      copyFileSync,
    });
    expect(copyFileSync).toBeCalledWith(
      path.join(from, 'bar.js'),
      path.join(targetFolder, 'bar.js'),
    );
  });
});

describe('doBuild', () => {
  it('build the page', async () => {
    const outdir = path.resolve(__dirname, 'fixtures', 'build-dummy-target');
    const options = {
      bundle: true,
      define: {
        'process.env.NODE_ENV': '"production"',
        'process.env.BASE_URL': 'a',
      },
      entryPoints: [
        path.resolve(__dirname, 'fixtures', 'build-dummy', 'entry.ts'),
      ],
      minify: true,
      outdir,
      platform: 'browser' as const,
      sourcemap: true,
      write: false,
    };

    const writeFileSync = jest.fn();
    await doBuild({
      esbuild: () => buildSync(options),
      options: {
        mute: true,
        esbuildOptions: options,
        hashFile: true,
        htmlOptions: {
          entry: path.resolve(__dirname, 'fixtures', 'baz.ejs'),
          minify: true,
        },
      },
      writeFileSync,
      existsSync: () => true,
    });
    expect(writeFileSync).toBeCalledTimes(3);
    const outputs = writeFileSync.mock.calls.reduce<Record<string, string>>(
      (acc, [filePath, content]) => {
        acc[filePath] = content;
        return acc;
      },
      {},
    );
    expect(Object.keys(outputs).length).toEqual(3);
    expect(outputs[path.join(outdir, 'b5d1382abb5b967c.js')]).toEqual(
      [
        '(()=>{function r(){return"bar"}function n(){const o=r();return{foo:"production",bar:o}}n();})();',
        '//# sourceMappingURL=entry.js.map',
        '',
        // it comes from esbuild, where \n is used instead of dependent on os
      ].join('\n'),
    );
    expect(JSON.parse(outputs[path.join(outdir, 'entry.js.map')])).toEqual({
      version: 3,
      sources: ['../build-dummy/bar.ts', '../build-dummy/entry.ts'],
      sourcesContent: [
        ['export function bar() {', "  return 'bar';", '}', ''].join('\n'),
        [
          "import { bar } from './bar';",
          '',
          'function foo() {',
          '  const b = bar();',
          '  return {',
          '    foo: process.env.NODE_ENV,',
          '    bar: b,',
          '  };',
          '}',
          '',
          'foo();',
          '',
          // it comes from esbuild, where \n is used instead of dependent on os
        ].join('\n'),
      ],
      mappings:
        'MAAO,aACL,MAAO,MCCT,aACE,MAAM,EAAI,IACV,MAAO,CACL,IAAK,aACL,IAAK,GAIT',
      names: [],
    });
    expect(outputs[path.join(outdir, 'index.html')].toString()).toEqual(
      '<script src=b5d1382abb5b967c.js></script>',
    );
  });
});
