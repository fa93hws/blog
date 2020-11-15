import { observable, action } from 'mobx';
import { RipplePosition } from './ripple';

export class RippleStore {
  @observable.ref
  ripplePosition: RipplePosition | undefined;

  @action
  setRipple(position: RipplePosition) {
    this.ripplePosition = position;
  }
}
