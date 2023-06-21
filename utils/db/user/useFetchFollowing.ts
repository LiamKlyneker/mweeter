import supabaseClient from "@/utils/supabase-client";
import { useUserContext } from "@/utils/user-provider";
import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export type Following = {
  user_id: string;
  following_user_id: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
  };
};

export default function useFetchFollowing() {
  const { session } = useSession();
  const user = useUserContext();
  const [following, setFollowing] = useState<Following[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      const { data: following } = await supabase
        .from('following')
        .select(
          `
            user_id,
            following_user_id (
              id,
              firstName,
              lastName,
              username,
              avatar
            )
          `
        )
        .eq('user_id', user.id);
      setFollowing(following as unknown as Following[] || []);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!session || !user) return;
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, user]);

  return { following, isLoading };
}