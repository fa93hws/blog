import * as React from 'react';
import { IconButton } from '../icon-button';
import { RippleStore } from '../ripple/ripple-store';

describe('IconButton', () => {
  const Icon = () => <span>icon</span>;

  it('renders a small initial IconButton', () => {
    expect(<IconButton size="small" Icon={Icon} />).toMatchRenderedSnapshot();
  });

  it('renders a large initial IconButton', () => {
    expect(<IconButton size="large" Icon={Icon} />).toMatchRenderedSnapshot();
  });

  it('renders a large circle initial IconButton', () => {
    expect(
      <IconButton size="large" circle Icon={Icon} />,
    ).toMatchRenderedSnapshot();
  });

  it('renders a large circle initial IconButton with ripple', () => {
    const store = new RippleStore();
    store.setRipple({ top: 100, left: 200 });
    expect(
      <IconButton size="large" circle Icon={Icon} store={store} />,
    ).toMatchRenderedSnapshot();
  });
});
