import { VideoInformations } from "@/interfaces/VideoInformations";

export type Result = VideoInformations & {
  downloaded?: boolean;
};

export interface ResultItemProps {
  item: Result;
  downloadSong: () => void;
  testID?: string;
}
