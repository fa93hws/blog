import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import '@pages/global.css';
import 'typeface-roboto';

const cssBaselineDecorator = (Story: React.ComponentType) => (
  <>
    <CssBaseline />
    <Story />
  </>
);
export const decorators = [cssBaselineDecorator];
export const parameters = { layout: 'fullscreen' };
