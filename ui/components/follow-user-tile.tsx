'use client';
import { useState } from 'react';
import Avatar from '@/ui/atoms/avatar';
import Button from '@/ui/atoms/button';
import Typography from '@/ui/atoms/typography';
import useFollowUser from '@/utils/db/user/useFollowUser';

type FollowUserTileProps = {
  userId: string;
  fullName: string;
  username: string;
  avatar: string;
  following?: boolean;
};

export default function FollowUserTile(props: FollowUserTileProps) {
  const { userId, fullName, username, following, avatar } = props;
  const [localFollowing, setLocalFollowing] = useState(following);
  const { followUser, unfollowUser } = useFollowUser();

  const handleOnFollow = async () => {
    try {
      if (!localFollowing) {
        await followUser(userId);
        setLocalFollowing(true);
      } else {
        await unfollowUser(userId);
        setLocalFollowing(false);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <article className="flex items-center gap-4 border-t py-4">
      <Avatar src={avatar} />
      <div className="flex-1">
        <Typography>{fullName}</Typography>
        <Typography>@{username}</Typography>
      </div>
      <Button variant="follow" onClick={handleOnFollow}>
        {localFollowing ? 'Following' : 'Follow'}
      </Button>
    </article>
  );
}
