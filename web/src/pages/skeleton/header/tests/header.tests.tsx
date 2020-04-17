import * as React from 'react';
import { Header } from '../header';

describe('Header', () => {
  it('renders the header without top bar title and icon is cross', () => {
    expect(
      <Header
        showShortBarTitle={false}
        onCloseClicked={jest.fn()}
        onMenuClicked={jest.fn()}
        icon="cross"
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the header with top bar title and icon is cross', () => {
    expect(
      <Header
        showShortBarTitle={true}
        onCloseClicked={jest.fn()}
        onMenuClicked={jest.fn()}
        icon="cross"
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the header without top bar title and icon is menu', () => {
    expect(
      <Header
        showShortBarTitle={false}
        onCloseClicked={jest.fn()}
        onMenuClicked={jest.fn()}
        icon="menu"
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the header with top bar title and icon is menu', () => {
    expect(
      <Header
        showShortBarTitle={true}
        onCloseClicked={jest.fn()}
        onMenuClicked={jest.fn()}
        icon="menu"
      />,
    ).toMatchRenderedSnapshot();
  });
});
