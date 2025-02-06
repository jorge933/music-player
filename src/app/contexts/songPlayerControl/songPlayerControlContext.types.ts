import { Song } from "@/interfaces/Song";

export interface SongPlaying {
  song: Song;
  playlistId: number;
  playedSeconds: number;
  isPlaying: boolean;
}

export interface SongPlayerControlContextProps {
  currentSongPlaying: SongPlaying;
  play: (videoId: string, playlistId: number) => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  pauseOrResume: () => void;
}
