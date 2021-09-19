import * as jwt from 'jsonwebtoken';
import { User } from '../db/models/user.model';

const SECRET_KEY: string = process.env.SECRET_KEY!;

export const generateToken = (payload: User): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' }, (err: any, token: string | any) => {
      if (!err) {
        resolve(token);
      } else {
        reject(err);
      }
    });
  });
};
