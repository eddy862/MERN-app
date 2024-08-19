import dotenv from "dotenv";
dotenv.config();
import { PassportStatic } from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import User from "../../models/user.model";

const secretOrKey = process.env.JWT_SECRET_KEY;

if (!secretOrKey) {
  throw new Error("JWT_SECRET_KEY is not defined in .env");
}

const opts: StrategyOptionsWithoutRequest = {
  secretOrKey: secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default function configJwtPassport(passport: PassportStatic) {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id, {password: false});

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
}
