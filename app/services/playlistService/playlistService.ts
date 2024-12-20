import { useStorage } from "@/hooks/useStorage/useStorage";
import { Playlist } from "@/interfaces/Playlist";

export class PlaylistService {
  private storage = useStorage();

  getPlaylists() {
    return this.storage.getItem<Playlist[]>("playlists") || [];
  }

  getPlaylistById(id: number) {
    const playlists = this.getPlaylists();

    return playlists.find((playlist) => playlist.id === id);
  }

  addPlaylist(playlist: Omit<Playlist, "id">) {
    const playlists = this.getPlaylists();
    const lastId = this.storage.getItem<number>("lastId") || 0;
    const id = lastId + 1;
    const newPlaylist = { ...playlist, id: lastId + 1 };

    this.storage.setItem("playlists", [...playlists, newPlaylist]);
    this.storage.setItem("lastId", id);
  }

  updatePlaylist(updatedPlaylist: Playlist) {
    const playlists = this.getPlaylists();

    const updatedPlaylists = playlists.map((playlist) =>
      updatedPlaylist.id === playlist.id ? updatedPlaylist : playlist,
    );

    this.storage.setItem("playlists", updatedPlaylists);
  }

  removePlaylist(id: number) {
    const playlists = this.getPlaylists();

    const updatedPlaylists = playlists.filter((p) => p.id !== id);

    this.storage.setItem("playlists", updatedPlaylists);
  }

  updateSongList(playlistId: number, songId: string) {
    const playlists = this.getPlaylists();

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
