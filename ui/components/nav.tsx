'use client';
import Link from '@/ui/atoms/link';
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Avatar from '../atoms/avatar';
import Typography from '../atoms/typography';
import { useUserContext } from '@/utils/user-provider';
import { useState } from 'react';

export default function Nav() {
  const user = useUserContext();
  const [navActive, setNavActive] = useState(false);

  return (
    <header className="sticky top-0 md:flex md:h-screen md:max-w-[260px] flex-1 grow md:justify-end border-r bg-slate-100 px-8 py-4">
      <figure
        className="text-2xl font-bold text-sky-600 md:hidden"
        onClick={() => setNavActive(!navActive)}
      >
        mweeter
      </figure>

      <span className="absolute right-full top-0 bg-slate-100 h-full w-[calc(50vw)] hidden md:block" />
      <nav
        className="flex-1 flex-col md:px-12 py-8 z-50 hidden md:block w-full data-[active=true]:flex"
        data-active={navActive}
      >
        <figure className="mb-8 text-2xl font-bold text-sky-600 hidden md:block">
          mweeter
        </figure>
        <ul className="mb-8 border-b pb-4">
          <li className="mb-4">
            <Link href="/">Home</Link>
          </li>
          <SignedIn>
            <li className="mb-4">
              <Link href="/following">Following</Link>
            </li>
            <li className="mb-4">
              <Link href="/profile">Your Profile</Link>
            </li>
          </SignedIn>
          <SignedIn>
            <li className="mb-4">
              <SignOutButton>
                <Link href="#">Log Out</Link>
              </SignOutButton>
            </li>
          </SignedIn>
          <SignedOut>
            <li className="mb-4">
              <SignInButton afterSignInUrl="/">
                <Link href="#">Log In</Link>
              </SignInButton>
            </li>
          </SignedOut>
        </ul>
        <SignedIn>
          <div className="flex items-center gap-2">
            <Avatar src={user?.avatar} />
            <div>
              <Typography>{user?.firstName} {user?.lastName}</Typography>
              <Typography>@{user?.username}</Typography>
            </div>
          </div>
        </SignedIn>
      </nav>
    </header>
  );
}
