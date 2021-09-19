import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/user.model';
import { generateToken } from '../utils/generateToken';

export const getToken = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;

  // remove the important data before a token is generated
  user.password = '';
  user.email = '';

  const payload = user;

  try {
    const token = await generateToken(payload);

    // testing
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};
