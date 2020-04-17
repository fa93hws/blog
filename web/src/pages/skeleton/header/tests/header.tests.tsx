import * as React from 'react';
import { Header } from '../header';

const noop = () => 0;

describe('Header', () => {
  it('renders the header without top bar title', () => {
    expect(
      <Header showShortBarTitle={false} onCloseClicked={noop} />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the header with top bar title', () => {
    expect(
      <Header showShortBarTitle={true} onCloseClicked={noop} />,
    ).toMatchRenderedSnapshot();
  });
});
