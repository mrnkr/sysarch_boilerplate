import * as yup from 'yup';

export default {
  schema: yup.object().shape({
    id: yup.string(),
  }),
  key: 'params',
};
