'use client';
import { useSession, useUser } from '@clerk/nextjs';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { User } from './db/user/useFetchPotentialFollows';
import { getSupabaseUser } from './db/user/utils';

export const UserContext = createContext<User & { refreshUser: () => void }>(null!);
export const UserConsumer = UserContext.Consumer;

export default function UserProvider(props: PropsWithChildren) {
  const { children } = props;
  const { session } = useSession();
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const verifySupabaseUser = async () => {
    if (!clerkUser || !session) return;
    try {
      const supabaseUser = await getSupabaseUser(session, clerkUser.id);
      setUser({ ...supabaseUser, clerk: clerkUser });
      if (!supabaseUser) {
        router.push('/welcome');
      }
    } catch (e) {
      alert(e);
    }
  };

  const refreshUser = async () => {
    if (!clerkUser || !session) return;
    const supabaseUser = await getSupabaseUser(session, clerkUser.id);
    setUser({ ...supabaseUser, clerk: clerkUser });
  };


  useEffect(() => {
    verifySupabaseUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);

  return <UserContext.Provider value={{
    ...user,
    refreshUser,
  }}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const user = useContext(UserContext);
  return user;
};
