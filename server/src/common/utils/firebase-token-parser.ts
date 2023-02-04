import * as admin from 'firebase-admin';

// import { firebaseConfig } from '../../config/firebase-conf';

export const parseFirebaseToken = async (
  authHeader: string,
  mimicId: string,
): Promise<admin.auth.DecodedIdToken> => {
  if (!authHeader && process.env.NODE_ENV === 'development') {
    const user = await admin.auth().getUser(mimicId);

    return {
      uid: user.uid,
      email: user.email,
    } as any;
  } else if (!authHeader) {
    throw new Error('Token not Found!');
  }

  const split = authHeader?.split('Bearer ');

  if (split?.length !== 2) {
    throw new Error('No Token Found!');
  }

  try {
    const token = split[1];

    return await admin.auth().verifyIdToken(token, false);
  } catch (err) {
    throw new Error('Invalid token found!');
  }
};
