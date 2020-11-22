import * as React from 'react';
import { Container, Typography, Link } from '@material-ui/core';

const Copyright = React.memo(() => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.largetimber.com">
        www.largetimber.com
      </Link>{' '}
      2020
      {'.'}
    </Typography>
  );
});

export const Footer = React.memo(() => (
  <Container maxWidth="lg" component="footer">
    <Typography variant="h6" align="center" gutterBottom>
      到底了哟
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="textSecondary"
      component="p"
    >
      下面没东西啦
    </Typography>
    <Copyright />
  </Container>
));
