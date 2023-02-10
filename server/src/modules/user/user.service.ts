import { hash } from 'argon2';
import { validate } from 'class-validator';

import { createFirebaseUser } from '../../common/utils/createFirebaseUser';
import { createDataSource } from '../../common/utils/dataSource';
import { createErrorMapArray } from '../../common/utils/createErrorMap';
import { AUTH_TYPE, User } from '../../entities/UserModel';
import { RegisterUserInput, UserResponse } from './user.interface';

export const getUserRepository = async () => {
  const dataSource = await createDataSource();

  return await dataSource.getRepository(User);
};

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
  const userRepository = await getUserRepository();

  return await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.communities', 'communities')
    .where('user._id = :_id', { _id: userId })
    .getOne();
};

export const getUserByEmail = async (email: string) => {
  const userRepository = await getUserRepository();

  return await userRepository
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.communities', 'communities')
  .where('user.email = :email', { email })
  .getOne();
};

export const getUserByUsername = async (username: string) => {
  const userRepository = await getUserRepository();

  return await userRepository
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.communities', 'communities')
  .where('user.username = :username', { username })
  .getOne();
};

export const createUser = async ({
  email,
  username,
  password,
  authType,
}: RegisterUserInput): Promise<UserResponse> => {
  let errors = [];
  const dataSource = await createDataSource();

  const userRepository = dataSource.getRepository(User);
  let hashedPassword = '';

  try {
    if (!password && authType === AUTH_TYPE.EMAIL_AND_PASSWORD) {
      return {
        user: null,
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

    const validationErrors = validateRegister({ email, username });

    const user = new User();

    user.email = email;
    user.username = username;
    user.password = hashedPassword;
    user.authType = authType;

    errors = await validate(user);
    const errorMapArray = createErrorMapArray(errors);

    if (errors.length > 0) {
      return {
        errors: [...errorMapArray, ...validationErrors],
        user: null,
      };
    }

    const createdUser = await userRepository.save(user);

    await createFirebaseUser(createdUser.email, createdUser._id);

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
        user: null,
      };
    }

    console.log(err.message);

    throw new Error(err.message);
  }
};

export const updateUser = async (userId: string, data: Partial<User>) => {
  const dataSource = await createDataSource();
  const userRepository = dataSource.getRepository(User);

  await userRepository.update({ _id: userId }, { ...data });

  const updatedUser = await userRepository.findOneOrFail({ where: { _id: userId } });

  return updatedUser;
};

export const deleteUser = async (userId: string) => {
  const dataSource = await createDataSource();
  const userRepository = dataSource.getRepository(User);

  await userRepository.delete({ _id: userId });
};
