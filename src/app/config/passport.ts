/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";
import bcryptjs from "bcryptjs";
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
          return done(null, false, { message: "user does not exist" });
        }
        if (!isUserExist.isActive) {
          return done(null, false, { message: "user does not active" });
        }
        if (
          isUserExist.isActive === IsActive.Blocked ||
          isUserExist.isActive === IsActive.InActive
        ) {
          return done(null, false, {
            message: `user is ${isUserExist.isActive}`,
          });
        }

        const isGoogleAuthenticated = isUserExist.auth.some(
          (providedObject) => providedObject.provider === "google"
        );

        if (isGoogleAuthenticated && !isUserExist.password) {
          return done(null, false, {
            message:
              "you have authenticated trough google, if you want to login with credential, then first of login with google and set a password with your gmail then you can login with email and password",
          });
        }

        if (isUserExist.isDeleted) {
          return done(null, false, { message: "user is deleted" });
        }

        //match password
        const isPasswordMatch = await bcryptjs.compare(
          password as string,
          isUserExist.password as string
        );
        if (!isPasswordMatch) {
          return done(null, false, { message: "password dose not match" });
        }
        return done(null, isUserExist);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(null, error);
    console.log(error);
  }
});
