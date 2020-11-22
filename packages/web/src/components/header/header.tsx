import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const Header = React.memo(() => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">夏目天子的博客</Typography>
    </Toolbar>
  </AppBar>
));
