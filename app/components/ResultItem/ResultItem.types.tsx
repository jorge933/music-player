import { Result } from "@/(pages)/(search)/interfaces/results.types";

export interface ResultItemProps {
  item: Result;
  downloadSong: () => void;
}
