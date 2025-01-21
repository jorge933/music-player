import { Playlist, PlaylistOmitted } from "@/interfaces/Playlist";
import { BaseCrudService } from "./baseCrudService";

export class PlaylistService extends BaseCrudService<Playlist> {
  constructor() {
    super("playlists");
  }

  create(playlist: PlaylistOmitted) {
    const playlists = this.getAll();
    const lastId = this.storage.getItem<number>("lastId") || 0;
    const id = lastId + 1;
    const newPlaylist = { ...playlist, id: lastId + 1, songs: [] };

    this.storage.setItem("playlists", [...playlists, newPlaylist]);
    this.storage.setItem("lastId", id);
  }

  updateSongList(playlistId: number, songId: string) {
    const playlists = this.getAll();

    const updatedPlaylist = playlists.map((playlist) => {
      if (playlist.id !== playlistId) return playlist;

      const { songs } = playlist;
      const alreadyAdded = songs.includes(songId);
      const updatedSongs = !alreadyAdded
        ? [...songs, songId]
        : songs.filter((id) => id !== songId);

      return { ...playlist, songs: updatedSongs };
    });

    this.storage.setItem("playlists", updatedPlaylist);
  }
}
