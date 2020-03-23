import loginBodyValidator from '../../src/validators/loginBodyValidator';
import validatorSchema from './validatorSchema';

describe('loginBodyValidator', () => {
  test('should be a validator', async () => {
    await expect(validatorSchema.validate(loginBodyValidator))
      .resolves
      .toBeDefined();
  });

  test('should validate', async () => {
    const { schema } = loginBodyValidator;
    const value = { email: 'xmr.nkr@gmail.com', password: 'patata2' };

    await expect(schema.validate(value))
      .resolves
      .toBeDefined();
  });

  test('should fail validation', async () => {
    const { schema } = loginBodyValidator;
    const value = { email: 'not_an_email', password: 'patata2' };

    await expect(schema.validate(value))
      .rejects
      .toBeDefined();
  });
});
