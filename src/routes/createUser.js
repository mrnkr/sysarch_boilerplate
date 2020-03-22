import createUserBodyValidator from '../validators/createUserBodyValidator';
import makeAsyncHandler from '../makeAsyncHandler';
import User from '../User';
import yupValidate from '../yupValidate';

export default router => router.post(
  '',
  yupValidate(createUserBodyValidator),
  makeAsyncHandler(async (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    await user.save();
    res.status(201).json(user.toDto());
  }),
);
