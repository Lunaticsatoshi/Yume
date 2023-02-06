import Head from 'next/head';
import Link from 'next/link';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { LoginForm } from 'src/container';

function Login() {
  return (
    <div className="flex bg-white">
      <Head>
        <title>Log in</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{
          backgroundImage: `url('https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png')`,
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-80">
          <h1 className="mb-2 text-lg font-bold">Login</h1>
          <LoginForm
            message={
              'By continuing, you agree to our User Agreement and Privacy Policy'
            }
          />
          <small>
            New to Reddit?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign Up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: () => <>Loading...</>,
})(Login);
