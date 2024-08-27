import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../../models/user.model";

export default function configGooglePassport(
  passport: passport.PassportStatic
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const findUser = await User.findOne({ googleId: profile.id });

          if (findUser) {
            return done(null, findUser);
          }

          const user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0].value,
          });

          await user.save();

          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
}
