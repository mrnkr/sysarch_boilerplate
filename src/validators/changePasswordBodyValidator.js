import * as yup from 'yup';

export default {
  schema: yup.object().shape({
    password: yup.string(),
  }),
  key: 'body',
};
