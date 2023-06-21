import supabaseClient from "@/utils/supabase-client";
import { useUserContext } from "@/utils/user-provider";
import { useSession } from "@clerk/nextjs";
import { useState } from "react";
import { Tweet } from "../types";

export default function useCreateTweet() {
  const { session } = useSession();
  const user = useUserContext();
  const [isCreating, setIsCreating] = useState(false);

  const createTweet = async (tweet: string) => {
    setIsCreating(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      const { data } = await supabase
        .from('tweets')
        .insert({ content: tweet, user_id: user.id })
        .select();
      return data?.pop() as unknown as Tweet;
    } catch (e) {
      alert(e)
    } finally {
      setIsCreating(false);
    }
  };

  return { createTweet, isCreating };
}