import changePasswordBodyValidator from '../../src/validators/changePasswordBodyValidator';
import validatorSchema from './validatorSchema';

describe('changePasswordBodyValidator', () => {
  test('should be a validator', async () => {
    await expect(validatorSchema.validate(changePasswordBodyValidator))
      .resolves
      .toBeDefined();
  });

  test('should validate', async () => {
    const { schema } = changePasswordBodyValidator;
    const value = { password: 'patata2' };

    await expect(schema.validate(value))
      .resolves
      .toBeDefined();
  });
});
