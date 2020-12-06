import * as React from 'react';
import {
  Box,
  Paper,
  Link,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { GitHub } from '@material-ui/icons';
import WeiboSVG from './weibo.svg';

const Weibo = React.memo(() => <img src={WeiboSVG} alt="weibo" />);

const useStyles = makeStyles((theme) => ({
  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    background: 'transparent',
  },
}));

export const SideBar = withTheme(
  React.memo(() => {
    const styles = useStyles();
    return (
      <Box>
        <Paper elevation={0} className={styles.paper}>
          <Typography variant="h6" gutterBottom>
            作者
          </Typography>
          <List>
            <ListItem>
              <Link
                className={styles.linkWrapper}
                href="https://github.com/fa93hws"
                target="__blank"
              >
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <GitHub />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Github</Typography>
                  </Grid>
                </Grid>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                className={styles.linkWrapper}
                href="https://www.weibo.com/hinanawi"
                target="__blank"
              >
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <Weibo />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Weibo</Typography>
                  </Grid>
                </Grid>
              </Link>
            </ListItem>
          </List>
        </Paper>
      </Box>
    );
  }),
);
