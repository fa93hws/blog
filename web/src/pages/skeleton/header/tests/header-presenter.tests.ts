import { HeaderStore } from '../header-store';

describe('HeaderStore', () => {
  it('hide short bar title by default', () => {
    const store = new HeaderStore();
    expect(store.isShortBarTitleHidden).toEqual(true);
  });

  it('shows the short bar title', () => {
    const store = new HeaderStore();
    store.isShortBarTitleHidden = true;
    store.showShortBarTitle();
    expect(store.isShortBarTitleHidden).toEqual(false);
  });

  it('hides the short bar title', () => {
    const store = new HeaderStore();
    store.isShortBarTitleHidden = false;
    store.hideShortBarTitle();
    expect(store.isShortBarTitleHidden).toEqual(true);
  });
});
