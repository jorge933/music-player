export interface Playlist {
  id: number;
  name: string;
  description?: string;
  imageUri?: string | null;
  songs: string[];
}
