'use client';
import Avatar from '@/ui/atoms/avatar';
import TextArea from '@/ui/atoms/textarea';
import Button from '@/ui/atoms/button';
import useCreateTweet from '@/utils/db/tweet/createTweet';
import { Tweet } from '@/utils/db/tweet/useFetchTweets';
import { useState } from 'react';

type TweetFormProps = {
  onAddTweetSuccessfully: (data: Tweet) => void;
};

export default function TweetForm(props: TweetFormProps) {
  const { onAddTweetSuccessfully } = props;
  const { createTweet, isCreating } = useCreateTweet();
  const [tweetText, setTweetText] = useState('');

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    tweetText.trim();
    if (!tweetText) return;
    
    const data = await createTweet(tweetText);
    onAddTweetSuccessfully(data as Tweet);
    setTweetText('');
  };

  return (
    <form onSubmit={handleOnSubmit} className="mb-10">
      <div className="mb-4 flex gap-4">
        <Avatar />
        <TextArea
          name="tweetText"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
      </div>
      <footer className="flex justify-end">
        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Sending...' : 'Send mweet'}
        </Button>
      </footer>
    </form>
  );
}
