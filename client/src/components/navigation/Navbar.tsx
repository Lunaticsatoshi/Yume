import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAuthState } from 'src/hooks';
import { SearchInput } from 'src/components';
import NavbarRight from './NavbarRight';
import Directory from './NavbarRight/Directory';

const Navbar: React.FC = () => {
  const [name, setName] = useState('');
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { isAuthenticated, user } = useAuthState();

//   const searchSubs = async () => {
//     clearTimeout(timer);
//     setTimer(
//       setTimeout(async () => {
//         try {
//           const { data } = await Axios.get(`/subs/search/${name}`);
//           setSubs(data);
//           console.log(data);
//         } catch (err) {
//           console.log(err);
//         }
//       }, 250)
//     );
//   };

  return (
    <div className="sticky inset-x-0 top-0 z-10 flex items-center justify-between px-5 h-12 bg-white dark:text-white dark:bg-black-500">
      {/* Logo and title */}
      <div className="flex items-center w-52">
        <Link href="/">
          <a>
          <Image width="40px" src="/images/redditFace.svg" height="40px" />
          </a>
        </Link>
        <span className="hidden text-2xl font-semibold lg:block">
        <Image
          src="/images/redditText.svg"
          width="70px"
          height="46px"
        />
        </span>
      </div>
      { isAuthenticated ? <Directory /> : null}
      {/* Search Input */}
      <SearchInput onChange={() => {}} />
      {/* Auth buttons */}
      <NavbarRight loading={loading} isAuthenticated={isAuthenticated} user={user} />
    </div>
  );
};

export default Navbar;
