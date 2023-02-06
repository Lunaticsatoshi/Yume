import { FC, FormEvent, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from 'src/utils/firebaseClient';

import { GoogleOAuthButton, InputField } from 'src/components';

// The type of props LoginForm receives
interface RegisterFormProps {
  initialEmail?: string;
  message?: string;
  roundedButton?: boolean;
}

const RegisterForm: FC<RegisterFormProps> = ({
  initialEmail,
  message,
  roundedButton = false,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err);
      setErrors({ general: 'Invalid email or password!' });
    }
  };

  const triggerPopupSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setErrors({ general: 'Google sign-in failed. Please try again!' });
    }
  };

  return (
    <div className="w-full mt-2">
      {message ? <p className="mb-10 text-sm">{message}</p> : null}

      <GoogleOAuthButton onClick={() => {}} />

      <div className="w-full h-0.5 bg-gray-200 mb-12 relative">
        <div className="bg-white w-10 absolute -top-2.5 left-36 text-center text-gray-400">
          OR
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          className="mb-2"
          type="text"
          value={username}
          setValue={setUsername}
          placeholder="USERNAME"
          error={errors.username}
        />
        <InputField
          className="mb-4"
          type="password"
          value={email}
          setValue={setEmail}
          placeholder="PASSWORD"
          error={errors.password}
        />

        <InputField
          className="mb-4"
          type="confirm password"
          value={password}
          setValue={setPassword}
          placeholder="PASSWORD"
          error={errors.password}
        />

        {errors ? (
          <div className="w-full my-2 text-sm text-red-300 flex items-center">
            {errors.general}
          </div>
        ) : null}

        <button
          className={`w-full py-3 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500  ${
            roundedButton ? 'rounded-3xl' : 'rounded-md'
          }`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
