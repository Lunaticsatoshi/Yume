import { hash } from 'argon2';
import { createFirebaseUser } from '../../common/utils/create-firebase-user';
import { createDataSource } from '../../common/utils/data-source';
import { User } from '../../entities/UserModel';
import { RegisterUserInput, UserResponse } from './user-interface';

export const validateRegister = (options: RegisterUserInput) => {
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
}: RegisterUserInput): Promise<UserResponse> => {
  let errors = [];

  const hashedPassword = await hash(password);

  errors = validateRegister({ email, username, password });

  if (errors.length > 0) {
    return {
      errors,
      user: {} as User,
    };
  }

  // eslint-disable-next-line init-declarations
  let user: User;

  try {
    const dataSource = await createDataSource();
    // User.create({}).save()
    const result = await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning('*')
      .execute();

    user = result.raw[0];

    await createFirebaseUser(user.email, user.userId);

    return {
      errors: [],
      user,
    };
  } catch (err) {
    // duplicate username error
    if (err.code === '23505') {
      return {
        errors: [
          {
            field: 'username',
            statusCode: '403',
            message: 'Username already taken',
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
