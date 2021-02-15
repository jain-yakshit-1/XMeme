/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import AppContext from 'app/AppContext';
import ChatWindow from 'app/main/ChatWindow';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    [theme.breakpoints.down("xs")]: {
      width: '100%'
    },
    width: theme.breakpoints.width("sm") / 1.25
  },
  desktopDrawer: {
    [theme.breakpoints.down("lg")]:{
      width: theme.breakpoints.width("sm") / 1.25,
    },
    width: theme.breakpoints.width("sm") / 1.25,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

function ChatPanel({ openMobile, onMobileClose, children }) {
  const classes = useStyles();
  const uniqueId = React.useContext(AppContext);
  const messageHistory = React.useRef([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(`${process.env.REACT_APP_SERVICE_WEBSOCKET_PROTOCOL}://${process.env.REACT_APP_SERVICE_DOMAIN}/memes/ws/${uniqueId}`, {
    onOpen: () => console.log('Connection Opened!!'),
    shouldReconnect: (closeEvent) => true,
    onClose: () => console.log('Connection Closed!!')
  });
  messageHistory.current = React.useMemo(() => messageHistory.current.concat(lastMessage), [lastMessage]);
  const handleClickSendMessage = React.useCallback((data) => sendMessage(data), [sendMessage]);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Connected',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Not Connected',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


  return (
    <React.Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="right"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={onMobileClose}>
              <ChevronLeftIcon color="secondary" />
            </IconButton>
            <Chip
              size="medium"
              label={connectionStatus}
              color={readyState !== ReadyState.OPEN ? 'secondary' : 'primary'}
            />
          </div>

          <Divider />

          <ChatWindow handleClickSendMessage={handleClickSendMessage} messageHistory={messageHistory} />
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="right"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          <div className={classes.drawerHeader}>
            <Chip
              size="medium"
              label={connectionStatus}
              color={readyState !== ReadyState.OPEN ? 'secondary' : 'primary'}
            />
          </div>

          <Divider />
          <ChatWindow handleClickSendMessage={handleClickSendMessage} messageHistory={messageHistory} />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}

ChatPanel.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default ChatPanel;
