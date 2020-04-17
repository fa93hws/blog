import { Resolve } from 'webpack';
import { resolve } from 'path';

export const resolveOption: Resolve = {
  extensions: ['.js', '.ts', '.tsx'],
  alias: {
    components: resolve(__dirname, '..', '..', 'src', 'components'),
    pages: resolve(__dirname, '..', '..', 'src', 'pages'),
  },
};
