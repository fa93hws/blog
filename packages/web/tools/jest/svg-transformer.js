// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve, relative } = require('path');

const webDir = resolve(__dirname, '..', '..');

module.exports = {
  process(src, filename) {
    const relativeFilename = relative(webDir, filename);
    return `module.exports.default = "${relativeFilename}";`;
  },
};
