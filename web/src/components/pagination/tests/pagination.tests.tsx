import * as React from 'react';
import { Pagination } from '../pagination';

describe('Pagination', () => {
  it.each([1, 4, 5, 6, 7, 10])('renders %d/10', (idx: number) => {
    expect(
      <Pagination currentPage={idx} totalPage={10} getLink={jest.fn()} />,
    ).toMatchRenderedSnapshot();
  });

  it.each([1, 4, 7])('renders %d/7', (idx: number) => {
    expect(
      <Pagination currentPage={idx} totalPage={7} getLink={jest.fn()} />,
    ).toMatchRenderedSnapshot();
  });
});
