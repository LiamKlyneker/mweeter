export type ClerkUser = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: {
    emailAddress: string;
  }[];
  username: string;
  profileImageUrl: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  primaryEmail: string;
};

export type Following = {
  user_id: string;
  following_user_id: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
  };
};

export type Tweet = {
  id: string;
  content: string;
  created_at: string;
  user_id: User;
};