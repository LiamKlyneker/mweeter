import Typography from '@/ui/atoms/typography';
import ShouldFollowList from '@/ui/components/should-follow-list';
import Feed from '@/ui/components/feed';

export default function Home() {
  return (
    <div className="flex gap-12">
      <section className="flex-1">
        <Typography variant="h1">Your Feed</Typography>
        <Feed />
      </section>
      <aside className="hidden max-w-[280px] flex-1 pt-16 lg:block">
        <Typography variant="h2">Follow Others</Typography>
        <ShouldFollowList />
      </aside>
    </div>
  );
}
