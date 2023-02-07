import { Request, Response } from 'express';

export type RequestContext = {
  req: Request;
  res: Response;
  payload: any;
};

export interface IRequestContextUser {
  uid: string;
  email: string;
  view: string;
}
