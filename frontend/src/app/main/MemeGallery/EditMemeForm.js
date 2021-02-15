import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useForm from 'app/hooks/useForm';
import { isFormValid } from 'app/helpers';


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    textSecondary: {
        marginRight: theme.spacing(1)
    },
    paper: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MemeForm({ open, handleClose, handleRefresh, id, url, caption, name }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();

    const { form, handleChange } = useForm({
        name: name,
        url: url,
        caption: caption
    });



    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.patch(`${process.env.REACT_APP_SERVICE_PROTOCOL}://${process.env.REACT_APP_SERVICE_DOMAIN}/memes/${id}`, form);
        handleRefresh();
        handleClose();
    }
    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle disableTypography id="responsive-dialog-title">
                    <Typography color="secondary" variant="h6">Edit Meme</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Container component="main" maxWidth="xs">
                        <div className={classes.paper}>
                            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    color="secondary"
                                    required
                                    fullWidth
                                    label="Meme URL"
                                    onChange={handleChange}
                                    name="url"
                                    type="text"
                                    value={form.url}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    color="secondary"
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    name="caption"
                                    label="Caption"
                                    type="text"
                                    value={form.caption}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    disabled={!isFormValid(form)}
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default MemeForm;