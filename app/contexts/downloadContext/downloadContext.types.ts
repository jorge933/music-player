import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";

export type ItemStatus = "downloading" | "error" | "canceled" | "finished";
export interface DownloadItem extends VideoDetails {
  status: ItemStatus;
  abort: () => void;
}
export interface DownloadContextType {
  queue: DownloadItem[];
  downloadSong: (details: VideoDetails) => void;
  removeFromQueue: (id: string) => void;
}
