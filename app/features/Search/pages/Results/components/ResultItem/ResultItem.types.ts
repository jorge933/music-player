import { Result } from "../../interfaces/results.types";

export interface ResultItemProps {
  item: Result;
  downloadSong: () => void;
}
