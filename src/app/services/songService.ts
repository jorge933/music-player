import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { getEnvironmentVariables } from "@/helpers/getEnvironmentVariables";
import { Song } from "@/interfaces/Song";
import axios from "axios";
import { BaseCrudService } from "./baseCrudService";
import { FileSystemService } from "./fileSystemService";

export class SongService extends BaseCrudService<Song> {
  constructor() {
    super("songs");
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
    const exists = await FileSystemService.existsPath(SONGS_DIRECTORY);

    if (!exists) await FileSystemService.createDirectory(SONGS_DIRECTORY);

    const path = SONGS_DIRECTORY + id + ".mp3";

    await FileSystemService.writeFile(path, data as string);

    return path;
  }

  saveSong(newSong: Song): void {
    const allSongs = this.getAll();

    allSongs.push(newSong);

    this.storage.setItem("songs", allSongs);
  }
}
