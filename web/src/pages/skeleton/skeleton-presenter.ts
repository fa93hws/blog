import { observable, action } from 'mobx';

export class SkeletonPresenter {
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
