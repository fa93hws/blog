import * as React from 'react';
import { mount } from 'enzyme';
import { Internal, withRipple, RipplableProps, RippleColor } from '../ripple';
import { RippleStore } from '../ripple-store';

describe('Ripple', () => {
  function createContainer(color: RippleColor) {
    return (props: RipplableProps) => (
      <button onMouseDown={props.onMouseDown}>
        button text
        <props.RippleSlot color={color} />
      </button>
    );
  }

  it('renders the white ripple', () => {
    const { Ripple } = Internal;
    expect(
      <Ripple position={{ top: 2, left: 4 }} color="white" />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the blue ripple', () => {
    const { Ripple } = Internal;
    expect(
      <Ripple position={{ top: 2, left: 4 }} color="blue" />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the container without ripple', () => {
    const Container = createContainer('white');
    const RippleComponent = withRipple(Container);
    expect(<RippleComponent />).toMatchRenderedSnapshot();
  });

  it('renders the container with white ripple', () => {
    const Container = createContainer('white');
    const storeFactory = () => {
      const store = new RippleStore();
      store.setRipple({ top: 2, left: 4 });
      return store;
    };
    const RippleComponent = withRipple(Container, storeFactory);
    expect(<RippleComponent />).toMatchRenderedSnapshot();
  });

  it('triggers ripple when mouse down', () => {
    const Container = createContainer('white');
    const store = new RippleStore();
    const storeFactory = () => store;
    const RippleComponent = withRipple(Container, storeFactory);
    const wrapper = mount(<RippleComponent />);
    wrapper.find('button').simulate('mouseDown', { clientX: 10, clientY: 20 });
    expect(store.ripplePosition).toEqual({
      left: 10,
      top: 20,
    });
  });
});
