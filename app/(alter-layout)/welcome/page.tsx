'use client';
import Typography from '@/ui/atoms/typography';
import useCreateUser, { ClerkUser } from '@/utils/db/user/useCreateUser';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WelcomePage() {
  const { user: clerkUser } = useUser();
  const { createUser } = useCreateUser();
  const router = useRouter();

  const addUserToSupabase = async (clerkUser: ClerkUser) => {
    try {
      await createUser(clerkUser);
      router.push('/');
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    addUserToSupabase(clerkUser as ClerkUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Typography variant="h1">Welcome {clerkUser?.fullName}!</Typography>
      <Typography>
        We are finishing some last stuff on your profile, hang tight please.
      </Typography>
      <div className="mt-8 h-10 w-10 animate-pulse rounded-full bg-slate-800" />
    </div>
  );
}
