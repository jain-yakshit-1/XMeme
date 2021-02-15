import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Identicon from 'react-identicons';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import LazyLoad from 'react-lazyload';
import makeStyles from '@material-ui/core/styles/makeStyles';
import placeholderImage from 'assets/images/undraw_page_not_found_su7k.svg';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import EditMemeForm from './EditMemeForm';

const useStyles = makeStyles((theme) => ({
    root: {
        breakInside: 'avoid',
        position: 'relative'
    },
    image: {
        textAlign: 'center'
    },
    avatar: {
        backgroundColor: '#121212',
        color: 'white'
    },
    responsive: {
        width: '100%',
        maxWidth: '400px',
        height: 'auto'
    },
    createBtn: {
        position: 'absolute',
        bottom: theme.spacing(1),
        right: theme.spacing(1),
        color: 'black',
        zIndex: 100
    },
}));

function ImageCard({ id, name, url, caption,  handleRefresh }) {
    const classes = useStyles();
    const addDefaultSrc = (ev) => {
        ev.target.src = placeholderImage;
    }

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };
    const [openForm, setOpenForm] = React.useState(false);

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} aria-label="user">
                        <Identicon size={25} count={5} string={name} />
                    </Avatar>
                }
                action={
                    <Paper>
                        <FacebookShareButton
                            url={url}
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={url}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton
                            url={url}
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </Paper>
                }
                title={<Typography variant="h6" noWrap={true} component="p">
                    {name}
                </Typography>}
            />
            <div className={classes.image}><LazyLoad><img alt="404" height={500} width={360} src={url} className={classes.responsive} onError={addDefaultSrc} /></LazyLoad>
            </div>
            <CardContent>

                <Typography variant="h6" color="primary"  paragraph component="p">
                    {caption}
                </Typography>
                <Fab onClick={handleClickOpen} className={classes.createBtn} color="secondary" size="small">
                    <EditIcon />
                </Fab>
            </CardContent>
            <EditMemeForm name={name} id={id} url={url} caption={caption} open={openForm} handleClose={handleClose} handleRefresh={handleRefresh} />
        </Card>
    );
};

export default ImageCard;