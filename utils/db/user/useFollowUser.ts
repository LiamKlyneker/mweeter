import supabaseClient from "@/utils/supabase-client";
import { useUserContext } from "@/utils/user-provider";
import { useSession } from "@clerk/nextjs";
import { useState } from "react";

export default function useFollowUser() {
  const { session } = useSession();
  const currentUser = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const followUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      await supabase.from('following').insert([
        {
          user_id: currentUser.id,
          following_user_id: userId,
        },
      ]);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      await supabase
        .from('following')
        .delete()
        .match({ user_id: currentUser.id, following_user_id: userId });
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { followUser, unfollowUser, isLoading };
}