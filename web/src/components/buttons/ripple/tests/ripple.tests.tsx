import * as React from 'react';
import { Internal, withRipple, RipplableProps } from '../ripple';
import { RippleStore } from '../ripple-store';

describe('Ripple', () => {
  const Container = (props: RipplableProps) => (
    <button onMouseDown={props.onMouseDown}>
      button text
      <props.RippleSlot />
    </button>
  );

  it('renders the ripple', () => {
    const { Ripple } = Internal;
    expect(<Ripple position={{ top: 2, left: 4 }} />).toMatchRenderedSnapshot();
  });

  it('renders the container without ripple', () => {
    const RippleComponent = withRipple(Container);
    expect(<RippleComponent />).toMatchRenderedSnapshot();
  });

  it('renders the container with ripple', () => {
    const store = new RippleStore();
    store.setRipple({ top: 2, left: 4 });
    const RippleComponent = withRipple(Container);
    expect(<RippleComponent store={store} />).toMatchRenderedSnapshot();
  });
});
