import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";

export enum ItemStatus {
  CANCELED = "canceled",
  FINISHED = "finished",
  DOWNLOADING = "downloading",
  ERROR = "error",
}
export interface DownloadItem extends VideoDetails {
  status: ItemStatus;
}
export interface DownloadContextType {
  queue: DownloadItem[];
  downloadSong: (details: VideoDetails) => void;
  removeFromQueue: (id: string) => void;
}
