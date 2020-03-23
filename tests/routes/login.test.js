import { spinupMongoMock, teardownMongoMock } from '../testMongo';
import registerRoute, { login } from '../../src/routes/login';
import User from '../../src/User';

describe('createUser route handler', () => {
  let user;
  let req;
  let res;

  beforeAll(spinupMongoMock);

  beforeAll(async () => {
    user = new User({
      email: 'xmr.nkr@hotmail.com',
      password: 'patata2',
    });

    await user.save();
  });

  beforeAll(() => process.env.JWT_SECRET = 'patakon_fela_kuti');

  beforeAll(async () => {
    req = {
      body: {
        email: 'xmr.nkr@hotmail.com',
        password: 'patata2',
      },
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

  test('should throw 401 in case user does not exist', async () => {
    const req = {
      body: {
        email: 'non_existent@mail.com',
        password: 'patata2',
      },
    };

    await expect(login(req, res))
      .rejects
      .toMatchObject({ code: 401 });
  });

  test('should throw 401 in case password is wrong', async () => {
    const req = {
      body: {
        email: 'xmr.nkr@hotmail.com',
        password: 'patata3',
      },
    };

    await expect(login(req, res))
      .rejects
      .toMatchObject({ code: 401 });
  });

  test('should respond with 200 on success', async () => {
    await login(req, res);

    expect(res.status)
      .toHaveBeenCalledWith(200);
  });

  test('should respond with token in body', async () => {
    await login(req, res);
    const { token } = res.json.mock.calls[0][0];

    expect(token).toBeDefined();
  });

  test('should register route', () => {
    const router = {
      post: jest.fn(),
    };

    registerRoute(router);

    expect(router.post)
      .toHaveBeenCalledTimes(1);
  });
});
