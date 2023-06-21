import supabaseClient from "@/utils/supabase-client";

export async function getSupabaseUser(session: any, clerkUserId: string) {
  const supabaseAccessToken = await session?.getToken({
    template: 'supabase-mweeter',
  });
  const supabase = await supabaseClient(supabaseAccessToken as string);
  const { data: supabaseUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', clerkUserId)
    .single();
  return supabaseUser;
}