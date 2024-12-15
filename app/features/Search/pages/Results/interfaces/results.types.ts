import { VideoInformations } from "@/interfaces/VideoInformations";

export type Result = VideoInformations & {
  downloaded?: boolean;
};
