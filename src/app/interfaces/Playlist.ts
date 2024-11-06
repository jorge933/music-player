import { Song } from "./Song";

export interface Playlist {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string | null;
  songs: Song[];
}
