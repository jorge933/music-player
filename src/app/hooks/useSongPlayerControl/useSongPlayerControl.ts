import { Playlist } from "@/interfaces";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useState } from "react";

export type PlayingSong = {
  song: Song;
  playlistId: number;
  playedSeconds: number;
};

export class SongPlayerControl {
  private readonly songService = new SongService();
  private readonly playlistService = new PlaylistService();

  private readonly playerState = useState<Audio.Sound | null>(null);
  private readonly setPlayer = this.playerState[1];

  private readonly currentSongPlayingState = useState<PlayingSong | null>(null);
  readonly currentSongPlaying = this.currentSongPlayingState[0];
  private readonly setCurrentSongPlaying = this.currentSongPlayingState[1];

  async play(videoId: string, playlistId?: number) {
    const player = new Audio.Sound();

    this.setPlayer((prev) => {
      if (prev) prev.unloadAsync();

      return player;
    });

    const song = this.songService.getById(videoId) as Song;

    const currentSongPlaying: PlayingSong = {
      song,
      playedSeconds: 0,
      playlistId: playlistId ?? 0,
    };

    player.setOnPlaybackStatusUpdate((status) =>
      this.handleStatusUpdate.apply(this, [status, currentSongPlaying]),
    );

    this.setCurrentSongPlaying(currentSongPlaying);

    player.loadAsync(
      { uri: song.path },
      { shouldPlay: true, positionMillis: (song.duration - 1) * 1000 },
    );
  }

  private handleStatusUpdate = (
    status: AVPlaybackStatus,
    currentSongPlaying: PlayingSong,
  ) => {
    if (!status.isLoaded) return;

    const { positionMillis } = status;
    const playedSeconds = positionMillis / 1000;

    this.setCurrentSongPlaying({
      ...currentSongPlaying,
      playedSeconds,
    });

    const roundedPlayedSeconds = Math.ceil(playedSeconds);
    if (roundedPlayedSeconds >= currentSongPlaying.song.duration)
      this.skipToNext(currentSongPlaying);
  };

  private skipToNext(currentSongPlaying: PlayingSong) {
    const { song, playlistId } = currentSongPlaying;

    const nextSongId = this.getNextSongId(song.id, playlistId);

    this.play(nextSongId, playlistId);
  }

  private getNextSongId(songId: string, playlistId: number) {
    const songs = playlistId
      ? (this.playlistService.getById(playlistId) as Playlist).songs
      : this.songService.getAll();

    const nextSongId = songs.reduce((value: string | null, current, index) => {
      if (value) return value;

      const isString = typeof current === "string";
      const currentId = isString ? current : current.id;

      if (currentId === songId) {
        const nextItem = songs[index + 1] || songs[0];
        const isString = typeof nextItem === "string";
        const nextId = isString ? nextItem : nextItem.id;

        return nextId;
      }

      return null;
    }, null);

    return nextSongId as string;
  }
}

export function useSongPlayerControl() {
  const player = new SongPlayerControl();

  return player;
}
