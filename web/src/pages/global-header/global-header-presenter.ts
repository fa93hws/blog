import { observable, action } from 'mobx';

export class GlobalHeaderStore {
  @observable.ref
  showShortBarTitle = false;

  @action
  setShowShortBarTitle(val: boolean) {
    this.showShortBarTitle = val;
  }
}
