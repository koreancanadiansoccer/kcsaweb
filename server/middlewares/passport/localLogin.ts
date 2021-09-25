import { User } from '../../db/models/user.model';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Request } from 'express';
import { compare } from 'bcryptjs';

passport.use(
  'localLogin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    async (req: Request, email: string, password: string, next: any) => {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          throw 'Unable to Find User!';
        }

        const validPassword = compare(password, user.password);
        if ((await validPassword) == false) {
          throw 'Incorrect Password!';
        }

        return next(null, user);
      } catch (err) {
        return next(err, false);
      }
    }
  )
);
