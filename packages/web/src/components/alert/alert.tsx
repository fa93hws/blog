import * as React from 'react';
import { observer } from 'mobx-react';
import { Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import { AlertStore, Options } from './alert-store';

export type ShowFn = (severity: Color, msg: string, options?: Options) => void;

export function createAlert(): {
  Component: React.ComponentType;
  showGlobalMsg: ShowFn;
} {
  const store = new AlertStore();
  const onClose = () => store.close();
  const Component = observer(() => (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      open={store.open}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={store.severity}>
        {store.message}
      </Alert>
    </Snackbar>
  ));
  const showGlobalMsg = (severity: Color, msg: string, options?: Options) =>
    store.show(severity, msg, options);
  return { Component, showGlobalMsg };
}
