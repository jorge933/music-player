import { DownloadItem } from "@/contexts/download/downloadContext.types";

export type DownloadCardProps = DownloadItem & {
  removeFromQueue: () => void;
};
