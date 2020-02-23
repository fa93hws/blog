import * as React from 'react';
import { Skeleton } from '../skeleton';
describe('Skeleton', function () {
    it('should match the snapshot', function () {
        var LeftNav = function () { return React.createElement("div", null, "Nav"); };
        var MainContent = function () { return React.createElement("div", null, "MainContent"); };
        expect(React.createElement(Skeleton, { LeftNav: LeftNav, MainContent: MainContent })).toMatchRenderedSnapshot();
    });
});
