import { resolve } from 'path';
export function getOutput(hashOutput) {
    var suffix = hashOutput ? '.[chunkhash:8]' : '';
    return {
        path: resolve(__dirname, '..', '..', 'dist/'),
        filename: "static/js/[name]" + suffix + ".js",
        chunkFilename: "static/js/[name]" + suffix + ".js",
    };
}
