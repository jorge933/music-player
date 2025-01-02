import { DownloadItem } from "@/contexts/downloadContext/downloadContext.types";

export type DownloadCardProps = DownloadItem & {
  removeFromQueue: () => void;
};
