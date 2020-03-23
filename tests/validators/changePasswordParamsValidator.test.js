import changePasswordParamsValidator from '../../src/validators/changePasswordParamsValidator';
import validatorSchema from './validatorSchema';

describe('changePasswordBodyValidator', () => {
  test('should be a validator', async () => {
    await expect(validatorSchema.validate(changePasswordParamsValidator))
      .resolves
      .toBeDefined();
  });

  test('should validate', async () => {
    const { schema } = changePasswordParamsValidator;
    const value = { id: '90fea060-06ee-4098-b5b3-c48cf2a9a3ec' };

    await expect(schema.validate(value))
      .resolves
      .toBeDefined();
  });
});
