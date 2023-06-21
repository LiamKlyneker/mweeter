'use client';
import { SignedIn } from '@clerk/nextjs';
import Typography from '@/ui/atoms/typography';
import ProfileForm from '@/ui/components/profile-form';
import { useFetchMyTweets } from '@/utils/db/tweet/useFetchMyTweets';
import Tweet from '@/ui/components/tweet';

export default function ProfilePage() {
  const { isLoading, tweets } = useFetchMyTweets()

  return (
    <SignedIn>
      <div className="max-w-lg">
        <Typography variant="h1">Your Profile</Typography>
        <ProfileForm />

        <Typography variant="h2">Your Latest Mweets</Typography>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            fullName={`${tweet.user_id.firstName} ${tweet.user_id.lastName}`}
            username={tweet.user_id.username}
            createdAt={tweet.created_at}
            content={tweet.content}
            avatar={tweet.user_id.avatar}
          />
        ))}
        {isLoading && <Typography>Fetching latest mweets...</Typography>}
        {tweets.length > 0 && !isLoading && (
          <Typography>That&rsquo;s all your mweets! 🙌</Typography>
        )}
        {tweets.length === 0 && !isLoading && (
          <Typography>No mweets to show, mweet something in your feed!</Typography>
        )}
      </div>
    </SignedIn>
  );
}
