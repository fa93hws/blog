import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { Nav } from '../nav';
import { NavItem } from '../nav-links/nav-links';

describe('Global Nav', () => {
  it('should match the snapshot', () => {
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
        <Nav navItems={items} />
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });
});
