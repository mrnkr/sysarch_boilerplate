import HttpError from '../HttpError';
import makeAsyncHandler from '../makeAsyncHandler';

export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    throw HttpError(403, 'Not logged in');
  }

  res.status(200).json(req.user.toDto());
};

export default router => router.get(
  '',
  makeAsyncHandler(getCurrentUser),
);
