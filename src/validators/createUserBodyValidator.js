import * as yup from 'yup';

export default {
  schema: yup.object().shape({
    email: yup.string().email(),
    password: yup.string(),
  }),
  key: 'body',
};
