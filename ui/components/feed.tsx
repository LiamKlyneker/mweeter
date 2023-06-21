'use client';
import { useFetchTweets } from "@/utils/db/tweet/useFetchTweets";
import Tweet from "./tweet";
import TweetForm from "@/ui/components/tweet-form";
import Typography from "../atoms/typography";
import { useUserContext } from "@/utils/user-provider";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Tweet as TweetProps } from "@/utils/db/types";

export default function Feed() {
  const user = useUserContext();
  const { isLoading, tweets, addNewTweet } = useFetchTweets();

  const handleOnAddTweetSuccessfully = (newTweet: TweetProps) => {
    addNewTweet({
      ...newTweet,
      user_id: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        avatar: user.avatar,
        primaryEmail: user.primaryEmail,
      }
    })
  };


  return (
    <>
      <SignedIn>
        <TweetForm onAddTweetSuccessfully={handleOnAddTweetSuccessfully} />
      </SignedIn>
      <SignedOut>
        <Typography>
          Sign in and start mweeting! <br />
          Also follow nice people to see their mweets.
        </Typography>
      </SignedOut>
      <SignedIn>
        <div className="mb-10">
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
        </div>
        {isLoading && <Typography>Fetching latest tweets...</Typography>}
        {tweets.length > 0 && !isLoading && (
          <Typography>That&rsquo;s all mweets for now! 🙌</Typography>
        )}
        {tweets.length === 0 && !isLoading && (
          <Typography>No mweets to show, start following people! 🙌</Typography>
        )}
      </SignedIn>
    </>
  )
}