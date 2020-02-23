import * as debug from 'debug';
var info = debug('webpack_options').extend(':info');
function parseMode(raw) {
    switch (raw === null || raw === void 0 ? void 0 : raw.toLowerCase()) {
        case 'development':
        case 'dev':
            return 'development';
        case 'production':
        case 'prod':
            return 'production';
        case undefined:
            throw new Error('webpack mode must be provided');
        default:
            throw new Error("Unknown webpack mode " + raw);
    }
}
function parseBoolean(name, defaultValue) {
    var value = process.env[name];
    switch (value === null || value === void 0 ? void 0 : value.toLowerCase()) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            if (defaultValue == null) {
                throw new Error("unknown " + name + ": " + value);
            }
            return defaultValue;
    }
}
export function getOptionsFromEnv() {
    var options = {
        hashOutput: parseBoolean('HASH_OUTPUT'),
        sourceMap: parseBoolean('SOURCE_MAP'),
        mode: parseMode(process.env.WEBPACK_MODE),
        isOnCI: parseBoolean('CI', false),
        hotModuleReplacement: parseBoolean('HOT_MODULE_RELOAD', false),
        tsTranspileOnly: parseBoolean('TS_TRANSPILE_ONLY', false),
    };
    info(options);
    return options;
}
