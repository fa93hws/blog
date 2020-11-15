import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { AbstractCard } from '../card';

describe('Card', () => {
  it('renders a abstract card', () => {
    expect(
      <MemoryRouter>
        <AbstractCard
          time="1999-02-02"
          title="some title"
          abstract="some abstract"
          linkTo="some-link"
        />
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });
});
