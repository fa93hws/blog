import { RippleStore } from '../ripple-store';

describe('RippleStore', () => {
  it('set the position to undefined by default', () => {
    const store = new RippleStore();
    expect(store.ripplePosition).toEqual(undefined);
  });

  it('set the position of the ripple', () => {
    const store = new RippleStore();
    store.setRipple({ top: 1, left: 2 });
    expect(store.ripplePosition).toEqual({ top: 1, left: 2 });
  });
});
