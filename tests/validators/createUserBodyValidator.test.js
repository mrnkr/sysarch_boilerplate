import createUserBodyValidator from '../../src/validators/createUserBodyValidator';
import validatorSchema from './validatorSchema';

describe('createUserBodyValidator', () => {
  test('should be a validator', async () => {
    await expect(validatorSchema.validate(createUserBodyValidator))
      .resolves
      .toBeDefined();
  });

  test('should validate', async () => {
    const { schema } = createUserBodyValidator;
    const value = { email: 'xmr.nkr@gmail.com', password: 'patata2' };

    await expect(schema.validate(value))
      .resolves
      .toBeDefined();
  });

  test('should fail validation', async () => {
    const { schema } = createUserBodyValidator;
    const value = { email: 'not_an_email', password: 'patata2' };

    await expect(schema.validate(value))
      .rejects
      .toBeDefined();
  });
});
