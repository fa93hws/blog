import * as React from 'react';
import { mount } from 'enzyme';
import { Pagination } from '../pagination';

class ErrorBoundary extends React.Component<{ onCatch(): void }> {
  componentDidCatch() {
    this.props.onCatch();
  }

  render() {
    return this.props.children;
  }
}

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
    const onCatch = jest.fn();
    const Element = (
      <ErrorBoundary onCatch={onCatch}>
        <Pagination currentPage={2} totalPage={1} getLink={jest.fn()} />
      </ErrorBoundary>
    );
    mount(Element);
    expect(onCatch).toHaveBeenCalled();
  });

  it('throws if current page is less than 0', () => {
    jest
      // eslint-disable-next-line no-underscore-dangle
      .spyOn((window as any)._virtualConsole, 'emit')
      .mockImplementation(() => false);
    jest.spyOn(console, 'error').mockImplementation(() => false);
    const onCatch = jest.fn();
    const Element = (
      // <ErrorBoundary onCatch={onCatch}>
      <Pagination currentPage={-2} totalPage={1} getLink={jest.fn()} />
      // </ErrorBoundary>
    );
    expect(() => mount(Element)).toThrow();
    // expect(onCatch).toHaveBeenCalled();
  });
});
