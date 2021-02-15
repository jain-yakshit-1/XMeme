import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import HideOnScroll from './HideOnScroll';
import ScrollToTop from './ScrollToTop';

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor: theme.palette.background.default,
  },
  logo:{
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  }
}));

function TopBar({
  className,
  onMobileNavOpen,
  ...rest
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <HideOnScroll {...rest}>
        <AppBar className={clsx(classes.root,className)}>
          <Toolbar className={classes.toolbar}>
            <Avatar className={classes.logo}>
              <Typography variant="h3">X</Typography>
            </Avatar>
            <Typography variant="h5" color="textPrimary" className={classes.title}>Meme</Typography>
            <Box ml={2} flexGrow={1} />
            <Hidden lgUp>
              <Button color="primary" onClick={onMobileNavOpen} variant="contained">
                <Typography variant="body1">Live Feed</Typography>
              </Button>
            </Hidden>
          </Toolbar>
          <Divider />
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollToTop {...rest}>
        <Fab color="primary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon fontSize="large" />
        </Fab>
      </ScrollToTop>
    </React.Fragment>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
