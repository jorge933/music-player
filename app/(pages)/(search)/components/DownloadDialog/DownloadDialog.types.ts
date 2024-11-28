export interface DownloadDialogProps {
  onDialogClose: (downloadedWithSuccess: boolean) => void;
  videoDetails: VideoDetails;
}

export interface Snippet {
  title: string;
  channelTitle: string;
  videoId: string;
  duration: string;
}
