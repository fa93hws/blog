import { makeObservable, observable, action } from 'mobx';
import { Color } from '@material-ui/lab';

export type Options = {
  key?: string;
};

export class AlertStore {
  open = false;

  message = '';

  severity: Color = 'info';

  key?: string;

  constructor() {
    makeObservable(this, {
      open: observable.ref,
      message: observable.ref,
      severity: observable.ref,
      show: action,
      close: action,
    });
  }

  show(severity: Color, message: string, options: Options = {}) {
    this.severity = severity;
    this.message = message;
    this.key = options.key;
    this.open = true;
  }

  close() {
    this.open = false;
  }
}
