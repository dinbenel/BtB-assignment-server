import { Request } from 'express';
import { IUserWithoutPassword } from './user.type';

export interface IReq extends Request {
  user?: IUserWithoutPassword;
}
