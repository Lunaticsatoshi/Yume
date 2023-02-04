import express, { Application, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(
  cors({
    origin: '*',
    maxAge: 86400,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: [
      'access-token',
      'refresh-token',
      'content-type',
      'content-length',
    ],
  }),
);

app.use(json());

app.use(cookieParser());

app.set('trust proxy', 1);

export default app;
