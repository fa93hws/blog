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
        var items = [
            {
                text: 'item1',
                link: 'link1',
            },
            {
                text: 'item2',
                link: 'link2',
            },
        ];
        expect(React.createElement(MemoryRouter, null,
            React.createElement(Nav, { author: author, navItems: items, sourceCodeUrl: "sourceCodeUrl" }))).toMatchRenderedSnapshot();
    });
});
