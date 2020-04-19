import * as React from 'react';
import { mount } from 'enzyme';
import { Pagination } from '../pagination';

describe('Pagination', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('throws if current page is greater than total page', () => {
    jest
      // eslint-disable-next-line no-underscore-dangle
      .spyOn((window as any)._virtualConsole, 'emit')
      .mockImplementation(() => false);
    jest.spyOn(console, 'error').mockImplementation(() => false);
    const Element = (
      <Pagination currentPage={2} totalPage={1} getLink={jest.fn()} />
    );
    expect(() => mount(Element)).toThrowErrorMatchingInlineSnapshot(
      `"currentPage must not be greater than totalPage"`,
    );
  });

  it('throws if current page is less than 0', () => {
    jest
      // eslint-disable-next-line no-underscore-dangle
      .spyOn((window as any)._virtualConsole, 'emit')
      .mockImplementation(() => false);
    jest.spyOn(console, 'error').mockImplementation(() => false);
    const Element = (
      <Pagination currentPage={-2} totalPage={1} getLink={jest.fn()} />
    );
    expect(() => mount(Element)).toThrowErrorMatchingInlineSnapshot(
      `"currentPage must be greater than 0"`,
    );
  });
});
