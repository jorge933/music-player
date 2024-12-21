import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { BaseCrudMethods } from "@/interfaces/BaseCrudMethods";
import { Song } from "@/interfaces/Song";
import axios, { HttpStatusCode } from "axios";
import * as FileSystem from "expo-file-system";

export class SongService implements BaseCrudMethods<Song> {
  private storage = useStorage();

  public getAll(): Song[] {
    return this.storage.getItem<Song[]>("songs") || [];
  }

  public getById(id: string): Song | undefined {
    const songs = this.getAll();

    return songs.find((song) => song.id === id);
  }

  public delete(id: string): void {
    const songs = this.getAll();
    const updatedSongs = songs.filter((song) => {
      const isSongToDelete = song.id === id;

      if (isSongToDelete) {
        FileSystem.deleteAsync(song.path);
      }

      return !isSongToDelete;
    });

    this.storage.setItem("songs", updatedSongs);
  }

  async downloadSong(videoId: string): Promise<void> {
    const { EXPO_PUBLIC_SERVER_URL: SERVER_URL } = process.env;
    const url = SERVER_URL + "/download";

    const { status, data } = await axios.post(url, {
      videoId,
    });

    if (status !== HttpStatusCode.Ok) throw new Error("Error in download");

    this.createSongFile(data, videoId);
  }

  async createSongFile(data: string, id: string) {
    const { exists } = await FileSystem.getInfoAsync(SONGS_DIRECTORY);

    if (!exists) await FileSystem.makeDirectoryAsync(SONGS_DIRECTORY);

    const path = SONGS_DIRECTORY + id + ".mp3";

    await FileSystem.writeAsStringAsync(path, data as string);
  }

  saveSong(newSong: Song): void {
    const allSongs = this.getAll();

    allSongs.push(newSong);

    this.storage.setItem("songs", allSongs);
  }

  create(item: Song): void {
    throw new Error("Method not implemented.");
  }

  update(item: Song): void {
    throw new Error("Method not implemented.");
  }
}
