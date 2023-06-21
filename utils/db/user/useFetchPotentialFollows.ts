import supabaseClient from "@/utils/supabase-client";
import { useUserContext } from "@/utils/user-provider";
import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { User } from "../types";

export default function useFetchPotentialFollows() {
  const { session } = useSession();
  const user = useUserContext();
  const [potentialFollows, setPotentialFollows] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: 'supabase-mweeter',
      });
      const supabase = await supabaseClient(supabaseAccessToken as string);
      const { data: potentialFollows } = await supabase
        .rpc('get_users_not_followed_alter', { current_user_id: user.id,})
        .neq('id', user.id);
      setPotentialFollows(potentialFollows as unknown as User[] || []);
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

  return { potentialFollows, isLoading };
}
