import { Request, Response } from 'express';

export type RequestContext = {
  req: Request;
  res: Response;
  user: IRequestContextUser;
};

export interface IRequestContextUser {
  uid: string;
  email: string;
  id: string
}
