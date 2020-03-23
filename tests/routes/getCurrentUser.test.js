import registerRoute, { getCurrentUser } from '../../src/routes/getCurrentUser';
import User from '../../src/User';

describe('createUser route handler', () => {
  let user;
  let req;
  let res;

  beforeAll(() => user = new User({ email: 'xmr.nkr@gmail.com', password: 'patata2' }));

  beforeAll(async () => {
    req = {
      user,
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

  test('should throw 403 in case user is not logged in', async () => {
    await expect(getCurrentUser({}, res))
      .rejects
      .toMatchObject({ code: 403 });
  });
  

  test('should respond with 200 on success', async () => {
    await getCurrentUser(req, res);

    expect(res.status)
      .toHaveBeenCalledWith(200);
  });
  
  test('should respond with dto in body', async () => {
    await getCurrentUser(req, res);

    expect(res.json)
      .toHaveBeenCalledWith(user.toDto());
  });

  test('should register route', () => {
    const router = {
      get: jest.fn(),
    };

    registerRoute(router);

    expect(router.get)
      .toHaveBeenCalledTimes(1);
  });
});
