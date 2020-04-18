import { observable, action } from 'mobx';

export class SkeletonStore {
  @observable.ref
  isMenuHidden = false;

  @action
  hideMenu() {
    this.isMenuHidden = true;
  }

  @action
  showMenu() {
    this.isMenuHidden = false;
  }
}
