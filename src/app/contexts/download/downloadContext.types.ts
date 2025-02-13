import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";

export enum ItemStatus {
  CANCELED = "canceled",
  FINISHED = "finished",
  DOWNLOADING = "downloading",
  ERROR = "error",
}
export interface DownloadItem extends VideoDetails {
  status: ItemStatus;
  abort: () => void;
}

export interface SongTimeRange {
  start?: number;
  end?: number;
}
export interface DownloadContextType {
  queue: DownloadItem[];
  downloadSong: (details: VideoDetails, range: SongTimeRange) => void;
  removeFromQueue: (id: string) => void;
}
