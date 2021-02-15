import { RE_IMAGE_URL } from 'app/constants';

export const isFormValid = (form) => {
    return (
        form.name.length > 0 &&
        form.url.length > 0 &&
        RE_IMAGE_URL.test(form.url) &&
        form.caption.length > 0

    )
}