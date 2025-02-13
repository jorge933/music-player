export enum ItemStatus {
  CANCELED = "canceled",
  FINISHED = "finished",
  DOWNLOADING = "downloading",
  ERROR = "error",
}
export interface DownloadItem extends VideoDetails {
  status: ItemStatus;
  progress: number;
  abort: () => void;
}

export interface SongTimeRange {
  start?: number;
  end?: number;
}

export type VideoDetails = {
  title: string;
  channelTitle: string;
  videoId: string;
  duration: number;
} & SongTimeRange;
export interface DownloadContextType {
  queue: DownloadItem[];
  downloadSong: (details: VideoDetails, range?: SongTimeRange) => void;
  removeFromQueue: (id: string) => void;
}
