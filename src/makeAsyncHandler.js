/**
 *
 * @param {(req, res) => Promise<void>} handler
 */
export default handler => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (err) {
    next(err);
  }
};
