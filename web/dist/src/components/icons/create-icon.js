import * as React from 'react';
var sizeRatioMap = {
    small: 1,
    medium: 2,
    large: 3,
};
function createSvgString(svgContent, size) {
    var ratio = sizeRatioMap[size];
    var width = 8 * 2 * ratio;
    var openTag = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + width + "\" viewBox=\"0 0 " + width + " " + width + "\"><g transform=\"scale(" + ratio + ")\">";
    return "" + openTag + svgContent + "</g></svg>";
}
var BaseIcon = function (_a) {
    var size = _a.size, svgContent = _a.svgContent, title = _a.title, className = _a.className;
    var svg = createSvgString(svgContent, size);
    return (React.createElement("span", { "aria-hidden": "true", className: className, title: title, dangerouslySetInnerHTML: { __html: svg } }));
};
export function createIcon(svgContent) {
    var Icon = function (_a) {
        var size = _a.size, title = _a.title, className = _a.className;
        return (React.createElement(BaseIcon, { size: size, title: title, svgContent: svgContent, className: className }));
    };
    return Icon;
}
