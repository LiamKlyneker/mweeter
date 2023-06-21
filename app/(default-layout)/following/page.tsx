'use client';
import Typography from '@/ui/atoms/typography';
import { SignedIn, useUser } from '@clerk/nextjs';
import useFetchFollowing from '@/utils/db/user/useFetchFollowing';
import FollowUserTile from '@/ui/components/follow-user-tile';

export default function FollowingPage() {
  const { following, isLoading } = useFetchFollowing();

  return (
    <SignedIn>
      <Typography variant="h1">People you follow</Typography>

      <div className="grid grid-cols-2 gap-x-10 mb-2">
        {following.map((following: any) => (
          <FollowUserTile
            key={following.following_user_id.id}
            userId={following.following_user_id.id}
            fullName={following.following_user_id.fullName}
            username={following.following_user_id.username}
            avatar={following.following_user_id.avatar}
            following
          />
        ))}
      </div>
      {isLoading && <Typography>Fetching people you follow...</Typography>}
      {!isLoading && following.length === 0 && (
        <Typography>You are a lonely soul for now, start looking for nice people to follow in your feed!</Typography>
      )}
    </SignedIn>
  );
}
