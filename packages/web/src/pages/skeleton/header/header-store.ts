import { observable, action } from 'mobx';

export class HeaderStore {
  @observable.ref
  isShortBarTitleHidden = true;

  @action
  showShortBarTitle() {
    this.isShortBarTitleHidden = false;
  }

  @action
  hideShortBarTitle() {
    this.isShortBarTitleHidden = true;
  }
}
