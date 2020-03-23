import { spinupMongoMock, teardownMongoMock } from '../testMongo';
import registerRoute, { changePassword } from '../../src/routes/changePassword';
import User from '../../src/User';

describe('changePassword route handler', () => {
  let user;
  let req;
  let res;

  beforeAll(spinupMongoMock);

  beforeAll(async () => {
    user = new User({
      email: 'xmr.nkr@gmail.com',
      password: 'patata2',
    });

    await user.save();
  });

  beforeAll(async () => {
    req = {
      params: { id: user._id },
      body: { password: 'patata3' },
    };
    res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
  });

  afterEach(() => {
    res.status.mockReset();
    res.json.mockReset();

    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
  });

  afterAll(teardownMongoMock);

  test('should throw 404 error', async () => {
    const req = {
      params: { id: '55e80b36-ef02-41e5-a463-7f1069e01e8c' },
      body: { password: 'patata2' },
    };

    await expect(changePassword(req, {}))
      .rejects
      .toMatchObject({ code: 404 });
  });

  test('should respond with 202 on success', async () => {
    await changePassword(req, res);

    expect(res.status)
      .toHaveBeenCalledWith(202);
  });

  test('should respond with dto in body', async () => {
    await changePassword(req, res);
    user = await User.findOne({ _id: user._id });

    expect(res.json)
      .toHaveBeenCalledWith(user.toDto());
  });

  test('should register route', () => {
    const router = {
      patch: jest.fn(),
    };

    registerRoute(router);

    expect(router.patch)
      .toHaveBeenCalledTimes(1);
  });
});

