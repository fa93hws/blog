import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { AbstractTitle } from '../title';

describe('AbstractTitle', () => {
  it('renders the title for the abstract', () => {
    expect(
      <MemoryRouter>
        <AbstractTitle linkTo="target">Abstract Title</AbstractTitle>
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });
});
