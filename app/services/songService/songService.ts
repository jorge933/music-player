import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { getEnvironmentVariables } from "@/helpers/getEnvironmentVariables";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { BaseCrudMethods } from "@/interfaces/BaseCrudMethods";
import { Song } from "@/interfaces/Song";
import axios from "axios";
import { FileSystemService } from "../fileSystem/fileSytemService";

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
        FileSystemService.delete(song.path);
      }

      return !isSongToDelete;
    });

    this.storage.setItem("songs", updatedSongs);
  }

  requestSongBuffer(videoId: string) {
    const { SERVER_URL } = getEnvironmentVariables("SERVER_URL");
    const url = SERVER_URL + "/download";
    const abortController = new AbortController();

    const request = axios.post(
      url,
      {
        videoId,
      },
      { signal: abortController.signal },
    );

    return { request, abort: abortController.abort.bind(abortController) };
  }

  async createSongFile(data: string, id: string) {
    const { exists } = await FileSystemService.getInfo(SONGS_DIRECTORY);

    if (!exists) await FileSystemService.createDirectory(SONGS_DIRECTORY);

    const path = SONGS_DIRECTORY + id + ".mp3";

    await FileSystemService.writeFile(path, data as string);
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
