import * as yup from 'yup';

export default yup.object().shape({
  key: yup
    .string()
    .oneOf(['body', 'params', 'query']),
  schema: yup
    .object()
    .test(
      'isSchema',
      'object is not a valid schema',
      value => yup.isSchema(value),
    ),
});
