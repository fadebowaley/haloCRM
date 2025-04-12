import { Grid } from 'rizzui/grid';
import ExplorePodcastsCategory from './explore-categories';
import FavoritePlaylist from './favorite-playlist';
import FeaturedPodcasts from './featured-podcasts';
import { AudioPlayerProvider } from './music-player/audio-player-context';
import MiniMusicPlayer from './music-player/mini-music-player';
import MusicPlayer from './music-player/music-player';
import PodcastSchedule from './podcast-schedule';
import RecentlyPlayed from './recently-played';
import PodcastsStatistics from './statistics';
import TopPodcaster from './top-podcaster';
import WelcomeBanner from './welcome-banner';
import { Box } from 'rizzui/box';

export function PodcastDashboard() {
  return (
    <AudioPlayerProvider>
      <Box className="@container/pod">
        <Grid className="grid-cols-1 items-start gap-6 @5xl/pod:grid-cols-12 3xl:gap-8">
          <Grid className="grid-cols-1 gap-6 @5xl/pod:col-span-8 3xl:gap-8">
            <WelcomeBanner className="w-full" />
            <RecentlyPlayed className="w-full" />
            <ExplorePodcastsCategory className="w-full" />
            <FeaturedPodcasts className="w-full" />
            <PodcastsStatistics className="w-full" />
          </Grid>
          <Grid className="grid-cols-1 gap-6 @3xl/pod:grid-cols-2 @5xl/pod:col-span-4 @5xl/pod:grid-cols-1 3xl:gap-8">
            <MusicPlayer className="hidden w-full @5xl/pod:block" />
            <TopPodcaster className="w-full" />
            <FavoritePlaylist className="w-full" />
            <PodcastSchedule className="col-span-1 w-full @3xl/pod:col-span-full @5xl/pod:col-span-1" />
          </Grid>
        </Grid>
        <MiniMusicPlayer className="flex @5xl/pod:hidden" />
      </Box>
    </AudioPlayerProvider>
  );
}
