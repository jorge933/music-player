import { Song } from "@/interfaces/Song";
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

  private readonly playerState = useState<Audio.Sound | null>(null);
  private readonly player = this.playerState[0];
  private readonly setPlayer = this.playerState[1];

  private readonly currentSongPlayingState = useState<PlayingSong | null>(null);
  readonly currentSongPlaying = this.currentSongPlayingState[0];
  private readonly setCurrentSongPlaying = this.currentSongPlayingState[1];

  async play(videoId: string, playlistId?: number) {
    if (this.player) await this.player.unloadAsync();

    const player = new Audio.Sound();

    this.setPlayer(player);

    player.setOnPlaybackStatusUpdate(this.handleStatusUpdate);

    const song = this.songService.getById(videoId) as Song;

    this.setCurrentSongPlaying({
      song,
      playedSeconds: 0,
      playlistId: playlistId ?? 0,
    });

    player.loadAsync({ uri: song.path }, { shouldPlay: true });
  }

  private handleStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    this.setCurrentSongPlaying(
      (prev) =>
        ({
          ...prev,
          playedSeconds: status.positionMillis / 1000,
        }) as PlayingSong,
    );
  };
}

export function useSongPlayerControl() {
  const player = new SongPlayerControl();

  return player;
}
