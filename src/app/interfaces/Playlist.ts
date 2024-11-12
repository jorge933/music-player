import { Song } from "./Song";

export interface Playlist {
  id: number;
  name: string;
  description?: string;
  imageUri?: string | null;
  songs: Song[];
}
