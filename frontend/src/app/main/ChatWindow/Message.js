import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Identicon from 'react-identicons';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        paddingLeft: 20
    },
    avatar: {
        height: 32,
        width: 32,
        marginRight: 20,
        backgroundColor: '#000',
        color: 'white'
    }
}));

function Message({ message }) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Box display="flex" maxWidth={400} >
                <Avatar className={classes.avatar} >
                    <Identicon size={30} count={5} string={message.id} />
                </Avatar>
                <Box
                    bgcolor="primary.main"
                    color="black"
                    borderRadius="borderRadius"
                    boxShadow={1}
                >
                    <Box px={1}> <Typography variant="caption" > {message.id} </Typography> </Box>
                    <Box color="white" py={1} px={2} bgcolor="black">
                        <Typography color="inherit" variant="body1" > {message.message} </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Message;