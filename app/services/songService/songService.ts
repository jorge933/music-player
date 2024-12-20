import { useStorage } from "@/hooks/useStorage/useStorage";
import { BaseCrudMethods } from "@/interfaces/BaseCrudMethods";
import { Song } from "@/interfaces/Song";
import * as FileSystem from "expo-file-system";

export class SongService implements BaseCrudMethods<Song> {
  private storage = useStorage();

  public getAll(): Song[] {
    return this.storage.getItem<Song[]>("songs") || [];
  }

  public getById(id: string) {
    const songs = this.getAll();

    return songs.find((song) => song.id === id);
  }

  public delete(id: string) {
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

  create(item: Song): void {
    throw new Error("Method not implemented.");
  }

  update(item: Song): void {
    throw new Error("Method not implemented.");
  }
}
