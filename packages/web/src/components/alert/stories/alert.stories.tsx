import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Color } from '@material-ui/lab/Alert';
import { text, select } from '@storybook/addon-knobs';
import { createAlert } from '../alert';

storiesOf('components.alert', module).add('Alert', () => {
  const { Component, showGlobalMsg } = createAlert();
  const msg = text('global message', '顾茗茗');
  const severity: Color = select(
    'severity',
    {
      error: 'error',
      success: 'success',
      warning: 'warning',
      info: 'info',
    },
    'error',
  );
  const handleClick = () =>
    showGlobalMsg(severity, msg, { key: Math.random().toString() });
  return (
    <div>
      <Component />
      <button onClick={handleClick}>点我啊！杂种！</button>
    </div>
  );
});
