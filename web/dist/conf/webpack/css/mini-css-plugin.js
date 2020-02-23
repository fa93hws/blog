export function getMiniCssExtractPluginOptions(hashOutput) {
    var suffix = hashOutput ? '.[chunkhash:8]' : '';
    return {
        filename: "static/css/[name]" + suffix + ".css",
        chunkFilename: "static/css/[name]" + suffix + ".css",
    };
}
