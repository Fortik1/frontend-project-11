import * as yup from 'yup';

export default (url) => {
    const shema = yup.object().shape({
        website: yup.string().url(),
    })
    return shema.isValid(url);
}
