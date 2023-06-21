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

export default function Nav() {
  const user = useUserContext();

  return (
    <header className="sticky top-0 flex h-screen max-w-[260px] flex-1 grow justify-end border-r bg-slate-100">
      <span className="absolute right-full top-0 bg-slate-100 h-full w-[calc(50vw)]" />
      <nav className="flex flex-1 flex-col px-12 py-8 z-50">
        <figure className="mb-8 text-2xl font-bold">mweeter</figure>
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
