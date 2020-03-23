import { spinupMongoMock, teardownMongoMock } from './testMongo';
import User from '../src/User';

describe('User model', () => {
  beforeAll(spinupMongoMock);
  afterAll(teardownMongoMock);

  test('should have a module', () => {
    expect(User).toBeDefined();
  });
  
  test('should expose a toDto method', () => {
    expect(User.prototype.toDto).toBeDefined();
  });

  test('should expose a comparePasswords method', () => {
    expect(User.prototype.comparePasswords).toBeDefined();
  });

  test('should not expose __v in dto', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'patata2',
    });
    const dto = user.toDto();

    expect(dto.__v).toBeUndefined();
  });

  test('should not expose password in dto', () => {
    const user = new User({
      email: 'test@test.com',
      password: 'patata2',
    });
    const dto = user.toDto();

    expect(dto.password).toBeUndefined();
  });

  test('should hash password', async () => {
    const user = new User({
      email: 'test@test.com',
      password: 'patata2',
    });

    await user.save();
    expect(user.password).not.toEqual('patata2');
  });
  
  test('should recognize right password', async () => {
    const user = new User({
      email: 'test@test.com',
      password: 'patata2',
    });

    await user.save();

    const passwordCorrect = await user.comparePasswords('patata2');
    expect(passwordCorrect).toBeTruthy();
  });

  test('should recognize wrong password', async () => {
    const user = new User({
      email: 'test@test.com',
      password: 'patata2',
    });

    await user.save();

    const passwordCorrect = await user.comparePasswords('not_the_right_password');
    expect(passwordCorrect).toBeFalsy();
  });
});
