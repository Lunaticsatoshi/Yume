import { withAuthUser, AuthAction } from 'next-firebase-auth';
import Head from 'next/head';
import Link from 'next/link';

import { RegisterForm } from 'src/container';

const Register = () => {
  //   const router = useRouter();
  //   if (authenticated) router.push('/');

  //   const submitForm = async (event: FormEvent) => {
  //     event.preventDefault();

  //     if (!agreement) {
  //       setErrors({ ...errors, agreement: 'You must agree to T&Cs' });
  //       return;
  //     }

  //     try {
  //       await Axios.post('/auth/register', {
  //         email,
  //         password,
  //         username,
  //       });

  //       router.push('/login');
  //     } catch (err) {
  //       setErrors(err.response.data);
  //     }
  //   };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{
          backgroundImage: `url('https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png')`,
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-80">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <RegisterForm
            message={
              'By continuing, you agree to our User Agreement and Privacy Policy'
            }
          />
          <small>
            Already a redditor?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
