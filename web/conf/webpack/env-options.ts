import { Configuration } from 'webpack';

type Option = {
  hashOutput: boolean;
  sourceMap: boolean;
  mode: Configuration['mode'];
};

function parseMode(raw: string | undefined): Configuration['mode'] {
  switch (raw?.toLowerCase()) {
    case 'development':
    case 'dev':
      return 'development';
    case 'production':
    case 'prod':
      return 'production';
    case undefined:
      throw new Error('webpack mode must be provided');
    default:
      throw new Error(`Unknown webpack mode ${raw}`);
  }
}

function parseBoolean(name: string): boolean {
  const value = process.env[name];
  switch (value?.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      throw new Error(`unknown ${name}: ${value}`);
  }
}

export function getOptionsFromEnv(): Option {
  return {
    hashOutput: parseBoolean('HASH_OUTPUT'),
    sourceMap: parseBoolean('SOURCE_MAP'),
    mode: parseMode(process.env.WEBPACK_MODE),
  };
}
