import HttpError from '../src/HttpError';

describe('HttpError', () => {
  test('should return an object with code and message', () => {
    const err = HttpError(400, 'Bad request');
    expect(err)
      .toEqual({ code: 400, message: 'Bad request', args: [] });
  });

  test('should add extra arguments on demand', () => {
    const err = HttpError(400, 'Validation failed', 'a', 'b');
    expect(err)
      .toEqual({ code: 400, message: 'Validation failed', args: ['a', 'b'] });
  });
});

