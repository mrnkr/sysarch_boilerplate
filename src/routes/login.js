import jwt from 'jsonwebtoken';
import loginBodyValidator from '../validators/loginBodyValidator';
import HttpError from '../HttpError';
import makeAsyncHandler from '../makeAsyncHandler';
import User from '../User';
import yupValidate from '../yupValidate';

export default router => router.post(
  '/login',
  yupValidate(loginBodyValidator),
  makeAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw HttpError(401);
    }

    const isPasswordCorrect = await user.comparePasswords(req.body.password);

    if (!isPasswordCorrect) {
      throw HttpError(401);
    }

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200).json({ token });
  }),
);
