import { MiddlewareFn } from "type-graphql";

import { RequestContext } from "../interfaces/RequestContext";
import { parseSupabaseToken } from "../utils/supabase-token-parser";

export const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
  // eslint-disable-next-line dot-notation
  const authorization = context.req.headers["authorization"] as string;
  const mimicId = context.req.headers["x-mimic-user-id"] as string;

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const payload = await parseSupabaseToken(authorization, mimicId);

    // eslint-disable-next-line require-atomic-updates
    context.user = payload as any;
  } catch (err) {
    // eslint-disable-next-line require-atomic-updates
    console.log(err);
    throw new Error(err.message);
  }

  return next();
};