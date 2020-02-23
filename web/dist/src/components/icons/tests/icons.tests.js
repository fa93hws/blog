import * as React from 'react';
import { createIcon } from '../create-icon';
describe('createIcon', function () {
    var svg = '<path></path>';
    var Icon = createIcon(svg);
    it('should generate the small icon correctly', function () {
        expect(React.createElement(Icon, { size: "small", className: "small-class", title: "small-title" })).toMatchRenderedSnapshot();
    });
    it('should generate the medium icon correctly', function () {
        expect(React.createElement(Icon, { size: "medium", className: "medium-class", title: "medium-title" })).toMatchRenderedSnapshot();
    });
    it('should generate the large icon correctly', function () {
        expect(React.createElement(Icon, { size: "large", className: "large-class", title: "large-title" })).toMatchRenderedSnapshot();
    });
});
