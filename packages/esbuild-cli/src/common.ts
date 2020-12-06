import * as fs from 'fs';
import * as path from 'path';
import type { BuildResult, OutputFile } from 'esbuild';
import * as crypto from 'crypto';
import { template } from 'lodash';
import { green, yellow, red } from 'chalk';
import * as minifyHtml from '@minify-html/js';

import type { Options } from './types';

export function ensureFolder(target: string): void {
  fs.rmdirSync(target, { recursive: true });
  fs.mkdirSync(target, { recursive: true });
}

export function hashOutputs(outputFiles: readonly OutputFile[]): OutputFile[] {
  return outputFiles.map((file) => {
    let filePath: string;
    if (['.js', '.css'].includes(path.extname(file.path))) {
      const md5sum = crypto.createHash('md5');
      const filename = md5sum.update(file.contents).digest('hex').slice(0, 16);
      filePath = path.join(
        path.dirname(file.path),
        filename + path.extname(file.path),
      );
    } else {
      filePath = file.path;
    }
    return {
      path: filePath,
      contents: file.contents,
      text: file.text,
    };
  });
}

function assertExists({
  filePath,
  name,
  existsSync = fs.existsSync,
}: {
  filePath: string;
  name: string;
  existsSync?: typeof fs.existsSync;
}) {
  if (!existsSync(filePath)) {
    throw new Error(`${name} ${filePath} does not exist`);
  }
}

export function generateHtml({
  options,
  files,
  outdir,
  existsSync = fs.existsSync,
  writeFileSync = fs.writeFileSync,
}: {
  options: NonNullable<Options['htmlOptions']>;
  files: readonly string[];
  outdir: string;
  existsSync?: typeof fs.existsSync;
  writeFileSync?: typeof fs.writeFileSync;
}) {
  const { entry: templatePath, minify } = options;
  assertExists({ filePath: templatePath, name: 'templatePath', existsSync });
  assertExists({ filePath: outdir, name: 'outdir', existsSync });
  files.forEach((file, idx) =>
    assertExists({ filePath: file, name: `file[${idx}]`, existsSync }),
  );
  const templateContent = fs.readFileSync(templatePath, { encoding: 'utf-8' });
  const jsFiles = files
    .filter((f) => path.extname(f) === '.js')
    .map((f) => path.relative(outdir, f))
    .map((f) => `/${f}`);
  const cssFiles = files
    .filter((f) => path.extname(f) === '.css')
    .map((f) => path.relative(outdir, f))
    .map((f) => `/${f}`);
  let htmlOutputContent = template(templateContent)({ jsFiles, cssFiles });
  if (minify) {
    const cfg = minifyHtml.createConfiguration({ minifyJs: false });
    htmlOutputContent = minifyHtml.minify(htmlOutputContent, cfg);
  }
  writeFileSync(path.join(outdir, 'index.html'), htmlOutputContent);
}

export function copyAssets({
  from,
  to,
  copyFileSync = fs.copyFileSync,
}: {
  from: string;
  to: string;
  copyFileSync?: typeof fs.copyFileSync;
}) {
  assertExists({ filePath: from, name: 'from' });
  ensureFolder(to);
  fs.readdirSync(from, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
    .forEach((file) =>
      copyFileSync(path.join(from, file), path.join(to, file)),
    );
}

export async function doBuild({
  afterBuild,
  esbuild,
  options,
  writeFileSync = fs.writeFileSync,
  existsSync = fs.existsSync,
}: {
  esbuild: () => Promise<BuildResult> | BuildResult;
  afterBuild?: () => void;
  options: Options;
  writeFileSync?: typeof fs.writeFileSync;
  existsSync?: typeof fs.existsSync;
}) {
  const { hashFile, esbuildOptions, htmlOptions, mute } = options;
  mute || console.log(green(`build start@${new Date().toISOString()}`));
  const { warnings, outputFiles } = await esbuild();
  if (!mute && warnings.length > 0) {
    console.warn(yellow(warnings));
  }
  if (outputFiles == null || outputFiles.length === 0) {
    mute || console.error(red('no output files are generated'));
    process.exit(1);
  }
  const buildFiles = hashFile ? hashOutputs(outputFiles) : outputFiles;
  buildFiles.forEach((file) => {
    fs.mkdirSync(path.dirname(file.path), { recursive: true });
    if (['.woff2', '.woff'].includes(path.extname(file.path))) {
      writeFileSync(file.path, file.contents);
    } else {
      writeFileSync(file.path, file.text);
    }
  });

  if (htmlOptions != null && esbuildOptions.outdir != null) {
    generateHtml({
      options: htmlOptions,
      files: buildFiles.map((f) => f.path),
      outdir: esbuildOptions.outdir,
      writeFileSync,
      existsSync,
    });
  }
  mute || console.log(green(`build success@${new Date().toISOString()}`));
  afterBuild && afterBuild();
}
