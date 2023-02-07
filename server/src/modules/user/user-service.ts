import { hash } from 'argon2';
import { createFirebaseUser } from '../../common/utils/create-firebase-user';
// import { createDataSource } from '../../common/utils/data-source';
import { AUTH_TYPE, User } from '../../entities/UserModel';
import { RegisterUserInput, UserResponse } from './user-interface';

export const validateRegister = (
  options: Omit<RegisterUserInput, 'password' | 'authType'>,
) => {
  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        statusCode: '400',
        message: 'cannot include an @',
      },
    ];
  }

  return [];
};

export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (userId: string) => {
  return await User.findOne({ where: { userId } });
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const getUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } });
};

export const createUser = async ({
  email,
  username,
  password,
  authType,
}: RegisterUserInput): Promise<UserResponse> => {
  let errors = [];
//   const dataSource = await createDataSource();
  let hashedPassword = '';

  try {
    if (!password && authType === AUTH_TYPE.EMAIL_AND_PASSWORD) {
      return {
        errors: [
          {
            field: 'password',
            statusCode: '403',
            message: 'password cannot be empty',
          },
        ],
      };
    }

    if (password) {
      hashedPassword = await hash(password);
    }

    errors = validateRegister({ email, username });

    if (errors.length > 0) {
      return {
        errors,
        user: {} as User,
      };
    }

    const createdUser = await User.create({ email, username, authType, password: hashedPassword }).save();

    await createFirebaseUser(createdUser.email, createdUser.userId);

    return {
      errors: [],
      user: createdUser,
    };
  } catch (err) {
    // duplicate username error
    if (err.code === '23505') {
      return {
        errors: [
          {
            field: 'username | email',
            statusCode: '403',
            message: 'username or email already exists',
          },
        ],
        user: {} as User,
      };
    }

    return {
      errors: [
        {
          statusCode: '500',
          message: 'Something went wrong',
        },
      ],
      user: {} as User,
    };
  }
};
