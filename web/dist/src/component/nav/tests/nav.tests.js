import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { Nav } from '../nav';
describe('Global Nav', function () {
    it('should match the snapshot', function () {
        var author = {
            name: 'author name',
            email: 'author email',
            avatar: {
                img: 'author avatar path',
                alt: 'author avatar alt',
                linkTo: 'author avatar link',
            },
        };
        expect(React.createElement(MemoryRouter, null,
            React.createElement(Nav, { author: author }))).toMatchRenderedSnapshot();
    });
});
