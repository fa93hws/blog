import * as React from 'react';
import { Nav } from '../nav';

describe('Global Nav', () => {
  it('should match the snapshot', () => {
    const author = {
      name: 'author name',
      email: 'author email',
      avatar: {
        img: 'author avatar path',
        alt: 'author avatar alt',
        linkTo: 'author avatar link',
      },
    };
    expect(<Nav author={author} />).toMatchRenderedSnapshot();
  });
});
