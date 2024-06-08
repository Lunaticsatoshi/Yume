import { verify } from "jsonwebtoken";

import { adminAuthClient } from '../supabase';
import { config } from '../../config/common';

import { IRequestContextUser } from '../interfaces/RequestContext';

// import { firebaseConfig } from '../../config/firebase-conf';

export const parseSupabaseToken = async (
  authHeader: string,
  mimicId: string,
): Promise<IRequestContextUser> => {
  if (!authHeader && process.env.NODE_ENV === 'development') {
    const { data } = await adminAuthClient.getUserById(mimicId);

    return {
      uid: data.user?.id,
      email: data.user?.email,
    } as IRequestContextUser;
  } else if (!authHeader) {
    throw new Error('Token not Found!');
  }

  const split = authHeader?.split('Bearer ');

  if (split?.length !== 2) {
    throw new Error('No Token Found!');
  }

  try {
    const token = split[1];

    return (verify(token, config.supabase.jwtSecret!) as IRequestContextUser);
  } catch (err) {
    throw new Error('Invalid token found!');
  }
};
