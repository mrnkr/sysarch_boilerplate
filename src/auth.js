import passport from 'passport';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './User';

passport.use(new AnonymousStrategy());

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(jwtOpts, async ({ sub }, done) => {
  try {
    const user = await User.findOne({ _id: sub });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

export default passport;
