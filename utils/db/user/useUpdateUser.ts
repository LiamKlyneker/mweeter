import { useSession } from "@clerk/nextjs";
import supabaseClient from "@/utils/supabase-client";
import { useUserContext } from "@/utils/user-provider";
import { User } from "./useFetchPotentialFollows";

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

export default function useUpdateUser() {
  const { session } = useSession();
  const user = useUserContext();

  const updateUser = async (params: Partial<User>) => {
    if (!user) return;
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      const { data } = await supabase.from('users').update({
        firstName: params.firstName,
        lastName: params.lastName,
      }).eq('id', user.id);
      return data;
    } catch (e) {
      alert(e);
    }
  };

  return { updateUser };
}