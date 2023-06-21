# Mweeter, a Twitter clone made with NextJS 13, Supabase, TailwindCSS and Clerk

## Demo
You can see the project live here: [https://mweeter-beta.vercel.app/](https://mweeter-beta.vercel.app/)

Clone the project and run the following commands:

```bash
pnpm i
# then
pnpm dev
```

## Details of the Project 🚀
### Stack: 
- NextJS 13
- Supabase
- TailwindCSS
- Clerk (For Authentication)

### About the UI.
The UI has these details that I want to mention:
- **`ui/atoms` folder**: Smallest components, like buttons, inputs, typography etc.
- **`ui/components` folder**: Bigger components, like the Navbar, the TweetForm, the Tiles etc. That uses the Atoms.
- Routing using app folder with two layouts.
- **Home Page**, or the Feed, where user can see only tweets of users that they follow or their own if they just added one in that moment.
- **Follow Others Aside**, where the user can see **only** users that they can follow.
- **Following Page**, where the user can see users that they already follow, from this page or the aside one users can perform follow/unfollow action.

- **Profile Page**, where the user can edit their profile information and also can see their own tweets.

### Supabase
Tables involved:
- `users`
- `tweets`
- `following`

Some custom Supabase functions that I implemented to fetch the data properly:
- Get all tweets from people that I follow:
```sql
CREATE OR REPLACE FUNCTION get_mweets_from_following_rpc(current_user_id text) returns setof tweets as $$
  select t.* from tweets AS t
  JOIN following AS f ON t.user_id = f.following_user_id
  WHERE f.user_id = current_user_id;
$$
LANGUAGE sql;
```

- Get all potential users that I can follow:
```sql
CREATE OR REPLACE FUNCTION get_users_not_followed_alter(current_user_id text) returns setof users as $$
  SELECT u.* from users AS u
  LEFT JOIN following AS f ON u.id = f.following_user_id AND f.user_id = current_user_id
  WHERE f.following_user_id IS NULL;
$$
LANGUAGE sql;
```

### Clerk as Auth Provider
After a user creates an account with a username using clerk we are sending them to a `/welcome` page where we setup their profile in our database, this will help us to have fine control about the public profile and also to have better relations with other tables such as `tweets` and `following`.

