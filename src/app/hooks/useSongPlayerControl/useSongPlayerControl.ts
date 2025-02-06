import { Song } from "@/interfaces/Song";
import { SongService } from "@/services/songService";
import { Audio } from "expo-av";

export class SongPlayerControl {
  private readonly songService = new SongService();

  private readonly player = new Audio.Sound();
  private currentPlaylist: number;

  async play(videoId: string, playlistId?: number) {
    await this.player.unloadAsync();

    const song = this.songService.getById(videoId) as Song;

    this.currentPlaylist = playlistId ?? 0;

    this.player.loadAsync({ uri: song.path }, { shouldPlay: true });
  }
}

export function useSongPlayerControl() {
  const player = new SongPlayerControl();

  return player;
}
