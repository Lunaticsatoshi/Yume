import { adminAuthClient } from '../supabase';

export const createSupabaseUser = async (email: string, userId: string) => {
  try {
    let user = null;

    try {
      user = await adminAuthClient.createUser({
        email,
      });
    } catch (e) {
      if (e.code === 'auth/email-already-exists') {
        user = await adminAuthClient.getUserById(userId);
      } else {
        throw e;
      }
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
