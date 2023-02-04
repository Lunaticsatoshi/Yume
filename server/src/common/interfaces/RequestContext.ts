import { Request, Response } from 'express';

export type MyContext = {
  req: Request;
  res: Response;
};

export interface IRequestContextUser {
  uid: string;
  email: string;
  view: string;
}
