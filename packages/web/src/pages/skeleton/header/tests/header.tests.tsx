import * as React from 'react';
import { Header } from '../header';

describe('Header', () => {
  it('renders the header without top bar title and icon is cross', () => {
    expect(
      <Header
        showShortBarTitle={false}
        onIconClicked={jest.fn()}
        icon="Cross"
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the header with top bar title and icon is cross', () => {
    expect(
      <Header
        showShortBarTitle={true}
        onIconClicked={jest.fn()}
        icon="Cross"
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the header without top bar title and icon is menu', () => {
    expect(
      <Header
        showShortBarTitle={false}
        onIconClicked={jest.fn()}
        icon="Menu"
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the header with top bar title and icon is menu', () => {
    expect(
      <Header showShortBarTitle={true} onIconClicked={jest.fn()} icon="Menu" />,
    ).toMatchRenderedSnapshot();
  });
});
