import { useSession } from "@clerk/nextjs";
import supabaseClient from "@/utils/supabase-client";

export type ClerkUser = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: {
    emailAddress: string;
  }[];
  username: string;
  profileImageUrl: string;
};

export default function useCreateUser() {
  const { session } = useSession();

  const createUser = async (clerkUser: ClerkUser) => {
    if (!clerkUser) return;
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      const { data } = await supabase.from('users').insert([
        {
          id: clerkUser.id,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          primaryEmail: clerkUser.emailAddresses[0].emailAddress,
          username: clerkUser.username,
          avatar: clerkUser.profileImageUrl,
        },
      ]);
      return data;
    } catch (e) {
      alert(e);
    }
  };

  return { createUser };
}