import { spinupMongoMock, teardownMongoMock } from '../testMongo';
import registerRoute, { createUser } from '../../src/routes/createUser';
import User from '../../src/User';

describe('createUser route handler', () => {
  let req;
  let res;

  beforeAll(spinupMongoMock);

  beforeAll(async () => {
    req = {
      body: {
        email: 'xmr.nkr@mailinator.com',
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

  afterEach(async () => await User.remove({ email: 'xmr.nkr@mailinator.com' }));

  afterAll(teardownMongoMock);

  test('should respond with 201 on success', async () => {
    await createUser(req, res);

    expect(res.status)
      .toHaveBeenCalledWith(201);
  });
  
  test('should respond with dto in body', async () => {
    await createUser(req, res);
    const user = await User.findOne({ email: 'xmr.nkr@mailinator.com' });

    expect(res.json)
      .toHaveBeenCalledWith(user.toDto());
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
