'use client';
import Typography from '@/ui/atoms/typography';
import FollowUserTile from './follow-user-tile';
import useFetchPotentialFollows from '@/utils/db/user/useFetchPotentialFollows';
import { SignedIn } from '@clerk/nextjs';

export default function ShouldFollowList() {
  const { potentialFollows, isLoading } = useFetchPotentialFollows();

  return (
    <SignedIn>
      <div className="mb-4">
        {potentialFollows.map((user) => (
          <FollowUserTile
            key={user.id}
            userId={user.id}
            fullName={`${user.firstName} ${user.lastName}`}
            username={user.username}
            avatar={user.avatar}
          />
        ))}
      </div>
      {isLoading && <Typography>Looking for more new nice people...</Typography>}
      {!isLoading && potentialFollows.length === 0 && (
        <Typography>No new nice people to follow for now u.u</Typography>
      )}
    </SignedIn>
  );
}
