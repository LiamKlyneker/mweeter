import { useEffect, useState } from "react";
import supabaseClient from "@/utils/supabase-client";
import { useSession } from "@clerk/nextjs";
import { useUserContext } from "@/utils/user-provider";
import { Tweet } from "../types";

export const useFetchTweets = () => {
  const { session } = useSession();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserContext();

  const fetchTweets = async () => {
    setIsLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      const { data: tweets } = await supabase
        .rpc('get_mweets_from_following_rpc', { current_user_id: user.id })
        .select(
          `
          id,
          content,
          created_at,
          user_id (
            id,
            firstName,
            lastName,
            username,
            avatar
          )
        `
        )
        .order('created_at', { ascending: false });
      setTweets(tweets as unknown as Tweet[] || []);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewTweet = (tweet: Tweet) => {
    setTweets([tweet, ...tweets]);
  };

  useEffect(() => {
    if (session && user) fetchTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, user]);

  return { tweets, isLoading, addNewTweet };
};