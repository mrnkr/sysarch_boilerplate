import makeAsyncHandler from '../src/makeAsyncHandler';

describe('async handler hof', () => {
  test('should call handler', async () => {
    const handler = jest.fn(() => Promise.resolve());
    const asyncHandler = makeAsyncHandler(handler);
    await asyncHandler();

    expect(handler)
      .toHaveBeenCalledTimes(1);
  });

  test('should pass req and res', async () => {
    const req = jest.fn();
    const res = jest.fn();
    const nextFn = jest.fn();
    const handler = jest.fn(() => Promise.resolve());
    const asyncHandler = makeAsyncHandler(handler);
    await asyncHandler(req, res, nextFn);

    expect(handler)
      .toHaveBeenCalledWith(req, res);
  });

  test('should call next with thrown error', async () => {
    const err = Error('HEHE');
    const handler = jest.fn(() => Promise.reject(err));
    const asyncHandler = makeAsyncHandler(handler);
    const nextFn = jest.fn();
    await asyncHandler({}, {}, nextFn);

    expect(nextFn)
      .toHaveBeenCalledWith(err);
  });
});
