import * as React from 'react';
export function createHomePage() {
    var page = function () { return (React.createElement("div", null,
        React.createElement("p", null, "hello world"))); };
    return page;
}
