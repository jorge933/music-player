import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { getEnvironmentVariables } from "@/helpers/getEnvironmentVariables";
import { Song } from "@/interfaces/Song";
import axios from "axios";
import { BaseCrudService } from "./baseCrudService";
import { FileSystemService } from "./fileSystemService";
import { PlaylistService } from "./playlistService";

export class SongService extends BaseCrudService<Song> {
  playlistService = new PlaylistService();

  constructor() {
    super("songs");
  }

  public delete(id: string): void {
    const songs = this.getAll();
    const playlists = this.playlistService.getAll();

    const updatedSongs = songs.filter((song) => {
      const isSongToDelete = song.id === id;

      if (isSongToDelete) {
        FileSystemService.delete(song.path);
      }

      return !isSongToDelete;
    });

    const updatedPlaylists = playlists.map((playlist) => {
      const songs = playlist.songs.filter((songId) => songId !== id);

      return { ...playlist, songs };
    });

    this.storage.setItem("songs", updatedSongs);
    this.storage.setItem("playlists", updatedPlaylists);
  }

  async downloadSong(videoId: string) {
    const { SERVER_URL } = getEnvironmentVariables("SERVER_URL");

    const url = SERVER_URL + "/download";

    const exists = await FileSystemService.existsPath(SONGS_DIRECTORY);

    if (!exists) await FileSystemService.createDirectory(SONGS_DIRECTORY);

    const path = SONGS_DIRECTORY + videoId + ".mp3";

    await FileSystemService.downloadFile(url, path, { headers: { videoId } });

    return path;
  }

  saveSongInStorage(newSong: Song): void {
    const allSongs = this.getAll();

    allSongs.push(newSong);

    this.storage.setItem("songs", allSongs);
  }

  filterSongsByName(value: string) {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedValue, "gi");

    const songs = this.getAll();
    const filteredSongs = songs.filter(({ title }) => regex.test(title));

    return filteredSongs;
  }
}
