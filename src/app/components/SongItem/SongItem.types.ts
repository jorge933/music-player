import { Song } from "@/interfaces/Song";

export interface SongItemProps {
  song: Song;
  deleteSong: (id: string) => void;
}
