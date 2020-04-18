import { Resolve } from 'webpack';
import { resolve, join } from 'path';

const SRC_DIR = resolve(__dirname, '..', '..', 'src');

export const resolveOption: Resolve = {
  extensions: ['.js', '.ts', '.tsx'],
  alias: {
    components: join(SRC_DIR, 'components'),
    pages: join(SRC_DIR, 'pages'),
    utils: join(SRC_DIR, 'utils'),
  },
};
