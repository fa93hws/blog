var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export function createCommonStep(step, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.inWeb, inWeb = _c === void 0 ? true : _c, _d = _b.alwaysRun, alwaysRun = _d === void 0 ? false : _d;
    var out = __assign({}, step);
    if (inWeb) {
        out['working-directory'] = 'web';
    }
    if (alwaysRun) {
        out.if = 'always()';
    }
    return out;
}
