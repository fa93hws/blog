import * as React from 'react';
import styles from './banner.css';
export var SourceCodeBanner = function (_a) {
    var sourceCodeUrl = _a.sourceCodeUrl;
    return (React.createElement("div", { className: styles.banner },
        React.createElement("a", { href: sourceCodeUrl }, "\u6E90\u4EE3\u7801")));
};
