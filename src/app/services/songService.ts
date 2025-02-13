import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { SongTimeRange } from "@/contexts/download/downloadContext.types";
import { getEnvironmentVariables } from "@/helpers/getEnvironmentVariables";
import { Song } from "@/interfaces/Song";
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

  async downloadSong(
    videoId: string,
    onProgress: (progress: number) => void,
    range?: SongTimeRange
  ) {
    const { SERVER_URL } = getEnvironmentVariables("SERVER_URL");

    const exists = await FileSystemService.existsPath(SONGS_DIRECTORY);
    if (!exists) await FileSystemService.createDirectory(SONGS_DIRECTORY);

    const params = new URLSearchParams({ videoId });

    if (range)
      Object.entries(range).forEach(([key, value]) =>
        params.append(key, value.toString())
      );

    const url = `${SERVER_URL}/download?${params.toString()}`;
    const path = SONGS_DIRECTORY + videoId + ".mp3";

    const handleProgress = (progress: { [key: string]: number }) => {
      const { totalBytesWritten, totalBytesExpectedToWrite } = progress;
      const percentage = (
        (totalBytesWritten / totalBytesExpectedToWrite) *
        100
      ).toFixed(2);

      onProgress(Number(percentage));
    };

    const download = FileSystemService.downloadResumable(
      url,
      path,
      {},
      handleProgress
    );

    const startDownload = download.downloadAsync.bind(download);
    const cancel = download.cancelAsync.bind(download);

    return { path, start: startDownload, cancel };
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
