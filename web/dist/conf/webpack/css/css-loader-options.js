import { resolve } from 'path';
export function getCssLoaderOption(_a) {
    var hashOutput = _a.hashOutput, sourceMap = _a.sourceMap;
    var localIdentName = hashOutput ? '[hash:base64]' : '[path][name]__[local]';
    return {
        modules: {
            mode: 'local',
            context: resolve(__dirname, '..', '..', '..', 'src'),
            localIdentName: localIdentName,
        },
        localsConvention: 'camelCaseOnly',
        importLoaders: 0,
        sourceMap: sourceMap,
    };
}
