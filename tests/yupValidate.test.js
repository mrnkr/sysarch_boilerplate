import * as yup from 'yup';
import yupValidate from '../src/yupValidate';

describe('yupValidate middleware', () => {
  const schema = yup.object().shape({
    name: yup.string().email(),
  });

  test('should call next with no arguments', async () => {
    const middleware = yupValidate({ schema, key: 'body' });
    const req = { body: { name: 'joselito@mailinator.com' } };
    const nextFn = jest.fn();
    await middleware(req, {}, nextFn);

    expect(nextFn)
      .toHaveBeenCalledWith();
  });

  test('should call next with validation error', async () => {
    const middleware = yupValidate({ schema, key: 'body' });
    const req = { body: { name: 'not_an_email' } };
    const nextFn = jest.fn();
    await middleware(req, {}, nextFn);

    expect(nextFn.mock.calls[0][0].message)
      .toBe('Schema validation failed');
  });
});
