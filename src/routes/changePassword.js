import changePasswordParamsValidator from '../validators/changePasswordParamsValidator';
import changePasswordBodyValidator from '../validators/changePasswordBodyValidator';
import HttpError from '../HttpError';
import makeAsyncHandler from '../makeAsyncHandler';
import User from '../User';
import yupValidate from '../yupValidate';

export default router => router.patch(
  ':id/password',
  yupValidate(changePasswordParamsValidator),
  yupValidate(changePasswordBodyValidator),
  makeAsyncHandler(async (req, res) => {
    let updated;

    try {
      updated = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { password: req.body.password } },
        { new: true },
      );
    } catch (err) {
      // NOOP
    }

    if (!updated) {
      throw HttpError(404);
    }

    res.status(202).json(updated.toDto());
  }),
);
