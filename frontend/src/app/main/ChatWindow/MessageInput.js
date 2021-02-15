import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';

import AppContext from 'app/AppContext';
import Identicon from 'react-identicons';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
    },
    avatar: {
        backgroundColor: '#121212',
        color: 'white'
    }
}));

function MessageInput({ addMessage }) {
    const identity = React.useContext(AppContext);
    const classes = useStyles();
    const [body, setBody] = React.useState();
    const handleChange = (event) => {
        event.persist();
        setBody({ message: event.target.value });
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            handleSend();
        }
    };

    const handleSend = () => {
        if (!body) {
            return;
        }
        body.id = identity;
        addMessage(JSON.stringify(body));
        setBody('');
    };


    return (
        <div className={classes.root} >
            <Avatar alt="Person" className={classes.avatar} >
                <Identicon size={25} count={5} string={identity} />
            </Avatar>
            <Paper
                variant="outlined"
                component={Box}
                flexGrow={1}
                ml={2}
                p={1}
            >
                <Input
                    className={classes.input}
                    disableUnderline
                    fullWidth
                    value={body ? body.message : ''}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    placeholder="Enter your message !"
                />
            </Paper>
            <Tooltip title="Send">
                <span>
                    <IconButton
                        color="secondary"
                        disabled={!body}
                        onClick={handleSend}
                    >
                        <SendIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
}

export default MessageInput;
