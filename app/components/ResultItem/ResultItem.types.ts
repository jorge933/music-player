import { Result } from "@/features/Results/interfaces/results.types";

export interface ResultItemProps {
  item: Result;
  downloadSong: () => void;
}
