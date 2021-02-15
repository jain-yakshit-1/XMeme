import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ChatPanel from './ChatPanel';
import MemeGallery from 'app/main/MemeGallery';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.breakpoints.width("sm") / 1.22
    }
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

function DashboardLayout() {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <div className={classes.root}>

        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <MemeGallery />
            </div>
          </div>
        </div>
        <ChatPanel
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />

      </div>
    </React.Fragment>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any
};

export default DashboardLayout;
