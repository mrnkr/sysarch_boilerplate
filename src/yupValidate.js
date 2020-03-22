import HttpError from './HttpError';

export default ({ schema, key }) => async (req, _, next) => {
  try {
    await schema.validate(req[key]);
    next();
  } catch (err) {
    next(HttpError(400, err));
  }
}
