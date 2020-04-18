import { SkeletonStore } from '../skeleton-store';

describe('SkeletonStore', () => {
  it('shows the menu by default', () => {
    const store = new SkeletonStore();
    expect(store.isMenuHidden).toEqual(false);
  });

  it('shows the menu', () => {
    const store = new SkeletonStore();
    store.isMenuHidden = true;
    store.showMenu();
    expect(store.isMenuHidden).toEqual(false);
  });

  it('hides the menu', () => {
    const store = new SkeletonStore();
    store.isMenuHidden = false;
    store.hideMenu();
    expect(store.isMenuHidden).toEqual(true);
  });
});
