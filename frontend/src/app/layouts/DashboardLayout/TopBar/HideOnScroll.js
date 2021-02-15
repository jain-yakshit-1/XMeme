import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll({ children, window }) {
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return <Slide appear={false} direction="down" in={!trigger} >{children}</Slide>;
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.any
};

export default HideOnScroll;