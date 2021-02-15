import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCard from './ImageCard';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import makeStyles from '@material-ui/core/styles/makeStyles';
import noContent from 'assets/images/undraw_not_found_60pq.svg';

import MemeForm from './MemeForm';

const useStyles = makeStyles((theme) => ({

    masonrylayout: {
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: `repeat(auto-fill,minmax(360px,1fr))`,
    },
    responsive: {
        width: '100%',
        height: 'auto'
    },
    refreshBtn: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            right: theme.breakpoints.width("sm") / 1.22
        },
        zIndex: 100,
    },
    createBtn: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            right: theme.breakpoints.width("sm") / 1.22
        },
        color: 'black',
        zIndex: 100
    },
}));

function MemeGallery() {
    const [openForm, setOpenForm] = React.useState(false);
    const [payload, setPayload] = React.useState([]);
    const [skip, setSkip] = React.useState(0);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };

    const handleRefresh = (event) => {
        axios.get(`${process.env.REACT_APP_SERVICE_PROTOCOL}://${process.env.REACT_APP_SERVICE_DOMAIN}/memes`)
            .then((response) => {
                setPayload(response.data)
            });
    }
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_PROTOCOL}://${process.env.REACT_APP_SERVICE_DOMAIN}/memes`)
            .then((response) => {
                setPayload(response.data)
            });
    }, [])
    const fetchMoreData = () => {
        const nextSkip = skip + 100;
        axios.get(`${process.env.REACT_APP_SERVICE_PROTOCOL}://${process.env.REACT_APP_SERVICE_DOMAIN}/memes?skip=${nextSkip}`)
            .then((response) => {
                setPayload([...payload, ...response.data]);
                setSkip(nextSkip);
            });
    };

    if (!payload.length) {
        return (<Container>
            <img alt="404" className={classes.responsive} src={noContent} />
        </Container>);
    }

    return (
        <React.Fragment>
            <InfiniteScroll
                dataLength={payload.length}
                next={fetchMoreData}
                hasMore={true}
            >
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 360: 1, 600: 2, 960: 3, 1280: 3 }}
                >
                    <Masonry gutter="10px">
                        {payload.map((i, index) => (

                            <ImageCard key={index} id={i.id} url={i.url} name={i.name} caption={i.caption}  handleRefresh={handleRefresh} />

                        ))}
                    </Masonry>
                </ResponsiveMasonry>

            </InfiniteScroll>
            <MemeForm open={openForm} handleClose={handleClose} handleRefresh={handleRefresh} />
            <Fab onClick={handleRefresh} className={classes.refreshBtn} color="primary" size="large" aria-label="scroll back to top">
                <RefreshIcon fontSize="large" />
            </Fab>
            <Fab onClick={handleClickOpen} className={classes.createBtn} color="secondary" size="large" aria-label="scroll back to top">
                <AddIcon fontSize="large" />
            </Fab>
        </React.Fragment>
    );
}

export default MemeGallery;