import Avatar from '@/ui/atoms/avatar';
import Typography from '@/ui/atoms/typography';
import { humanizeDate } from '@/utils/humanizers';

type TweetProps = {
  content: string;
  fullName: string;
  username: string;
  createdAt: string;
};

export default function Tweet(props: TweetProps) {
  const { content, fullName, username, createdAt } = props;

  return (
    <article className="mb-8 flex gap-4">
      <Avatar />
      <div>
        <header className="mb-3 flex gap-3">
          <Typography className="font-semibold text-slate-900">
            {fullName}
          </Typography>
          <Typography className="whitespace-nowrap">
            @{username} | {humanizeDate(createdAt)}
          </Typography>
        </header>
        <div>
          <Typography>{content}</Typography>
        </div>
      </div>
    </article>
  );
}
