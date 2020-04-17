import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { Nav } from '../nav';
import { AuthorProps } from '../author/author';
import { NavItem } from '../nav-links/nav-links';

describe('Global Nav', () => {
  it('should match the snapshot', () => {
    const author: AuthorProps = {
      name: 'author name',
      email: 'author email',
      avatar: {
        img: 'author avatar path',
        alt: 'author avatar alt',
        linkTo: 'author avatar link',
      },
    };
    const items: readonly NavItem[] = [
      {
        text: 'item1',
        link: 'link1',
      },
      {
        text: 'item2',
        link: 'link2',
      },
    ];
    expect(
      <MemoryRouter>
        <Nav author={author} navItems={items} sourceCodeUrl="sourceCodeUrl" />
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });
});
