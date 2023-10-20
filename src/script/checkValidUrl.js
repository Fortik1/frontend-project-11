import * as yup from 'yup';

export default (url) => {
    const shema = yup.string().required().nullable().url();
    return shema.validate(url);
}
