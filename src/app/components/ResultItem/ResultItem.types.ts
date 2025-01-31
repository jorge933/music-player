import { VideoInformations } from "@/interfaces/VideoInformations";

export type Result = VideoInformations & {
  downloading?: boolean;
};

export type States = "available" | "downloading" | "downloaded";

export interface ResultItemProps {
  item: Result;
  downloadSong: () => void;
  testID?: string;
}
