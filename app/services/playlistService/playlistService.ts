import { useStorage } from "@/hooks/useStorage/useStorage";
import { BaseCrudMethods } from "@/interfaces/BaseCrudMethods";
import { Playlist } from "@/interfaces/Playlist";

export class PlaylistService implements BaseCrudMethods<Playlist> {
  private storage = useStorage();

  getAll() {
    return this.storage.getItem<Playlist[]>("playlists") || [];
  }

  getById(id: number) {
    const playlists = this.getAll();

    return playlists.find((playlist) => playlist.id === id);
  }

  create(playlist: Omit<Playlist, "id">) {
    const playlists = this.getAll();
    const lastId = this.storage.getItem<number>("lastId") || 0;
    const id = lastId + 1;
    const newPlaylist = { ...playlist, id: lastId + 1 };

    this.storage.setItem("playlists", [...playlists, newPlaylist]);
    this.storage.setItem("lastId", id);
  }

  update(updatedPlaylist: Playlist) {
    const playlists = this.getAll();

    const updatedPlaylists = playlists.map((playlist) =>
      updatedPlaylist.id === playlist.id ? updatedPlaylist : playlist,
    );

    this.storage.setItem("playlists", updatedPlaylists);
  }

  delete(id: number) {
    const playlists = this.getAll();

    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);

    this.storage.setItem("playlists", updatedPlaylists);
  }

  updateSongList(playlistId: number, songId: string) {
    const playlists = this.getAll();

    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id !== playlistId) return playlist;
      const { songs } = playlist;
      const alreadyAdded = songs.includes(songId);
      const updatedSongs = !alreadyAdded
        ? [...songs, songId]
        : songs.filter((id) => id !== songId);

      return { ...playlist, songs: updatedSongs };
    });

    this.storage.setItem("playlists", updatedPlaylists);
  }
}
