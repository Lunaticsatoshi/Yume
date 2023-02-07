import { MiddlewareFn } from "type-graphql";
import { RequestContext } from "../interfaces/RequestContext";
import { parseFirebaseToken } from "../utils/firebase-token-parser";

// bearer 102930ajslkdaoq01

export const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
  // eslint-disable-next-line dot-notation
  const authorization = context.req.headers["authorization"] as string;
  const mimicId = context.req.headers["x-mimic-user-id"] as string;

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const payload = await parseFirebaseToken(authorization, mimicId);

    // eslint-disable-next-line require-atomic-updates
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("not authenticated");
  }

  return next();
};