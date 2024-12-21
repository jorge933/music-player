export interface DownloadDialogProps {
  onDialogClose: (downloadedWithSuccess: boolean) => void;
  videoDetails: VideoDetails;
}

export interface VideoDetails {
  title: string;
  channelTitle: string;
  videoId: string;
  duration: number;
}
