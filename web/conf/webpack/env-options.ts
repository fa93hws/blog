import { Configuration } from 'webpack';

type Option = {
  hashOutput: boolean;
  sourceMap: boolean;
  mode: Configuration['mode'];
  isOnCI: boolean;
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

function parseBoolean(name: string, defaultValue?: boolean): boolean {
  const value = process.env[name];
  switch (value?.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      if (defaultValue == null) {
        throw new Error(`unknown ${name}: ${value}`);
      }
      return defaultValue;
  }
}

export function getOptionsFromEnv(): Option {
  return {
    hashOutput: parseBoolean('HASH_OUTPUT'),
    sourceMap: parseBoolean('SOURCE_MAP'),
    mode: parseMode(process.env.WEBPACK_MODE),
    isOnCI: parseBoolean('CI', false),
  };
}
