'use client';
import { Tweet as TweetProps, useFetchTweets } from "@/utils/db/tweet/useFetchTweets";
import Tweet from "./tweet";
import TweetForm from "@/ui/components/tweet-form";
import Typography from "../atoms/typography";
import { useUserContext } from "@/utils/user-provider";

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
      <TweetForm onAddTweetSuccessfully={handleOnAddTweetSuccessfully} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            fullName={`${tweet.user_id.firstName} ${tweet.user_id.lastName}`}
            username={tweet.user_id.username}
            createdAt={tweet.created_at}
            content={tweet.content}
          />
        ))}
      </div>
      {isLoading && <Typography>Fetching latest tweets...</Typography>}
    </>
  )
}