import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ImageCard from 'app/main/MemeGallery/ImageCard';
import MessageInput from './MessageInput';
import Message from './Message';
import chatBackground from 'assets/images/undraw_Messaging_re_pgx8.svg';

const useStyles = makeStyles(() => ({
    messageList: {
        height: '100%',
        display: 'flex',
        backgroundImage: `url(${chatBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto',
        flexDirection: 'column-reverse',
        overflow: 'auto',
        position: 'relative'
    },

}));

function ChatWindow({ handleClickSendMessage, messageHistory}) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.messageList}>
                <div>
                    {
                        messageHistory && messageHistory.current.map((message, idx) => {
                            if (message) {
                                message = JSON.parse(message.data);
                                if ('url' in message) {
                                    return <ImageCard key={idx} url={message.url} name={message.name} caption={message.caption} />;
                                }
                                return <Message key={idx} message={message} />;
                            }
                            return ''
                        })

                    }
                </div>
            </div>
            <MessageInput addMessage={handleClickSendMessage} />
        </React.Fragment>

    );
}

export default ChatWindow;