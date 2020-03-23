import createUserBodyValidator from '../validators/createUserBodyValidator';
import makeAsyncHandler from '../makeAsyncHandler';
import User from '../User';
import yupValidate from '../yupValidate';

export const createUser = async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.status(201).json(user.toDto());
};

export default router => router.post(
  '',
  yupValidate(createUserBodyValidator),
  makeAsyncHandler(createUser),
);
