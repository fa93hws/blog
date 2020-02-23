export var createInstallNodeModulesStep = function (cacheStep) {
    var out = {
        id: 'npm-ci',
        name: 'install node modules',
        run: 'npm ci',
        'working-directory': 'web',
    };
    if (cacheStep != null) {
        out.if = "steps." + cacheStep.id + ".outputs.cache-hit != 'true'";
    }
    // if: condition,
    return out;
};
