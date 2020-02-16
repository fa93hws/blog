import * as React from 'react';
import { createNav } from '../nav';

describe('Global Nav', () => {
  it('should match the snapshot', () => {
    const Nav = createNav();
    expect(<Nav />).toMatchRenderedSnapshot();
  });
});
