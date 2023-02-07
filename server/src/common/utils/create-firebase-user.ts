import admin from '../firebase';

export const createFirebaseUser = async (email: string, userId: string) => {
  try {
    let user = null;

    try {
      user = await admin.auth().createUser({
        email,
      });
    } catch (e) {
      if (e.code === 'auth/email-already-exists') {
        user = await admin.auth().getUserByEmail(email);
      } else {
        throw e;
      }
    }

    await admin.auth().setCustomUserClaims(user.uid, {
      id: userId,
      email,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
