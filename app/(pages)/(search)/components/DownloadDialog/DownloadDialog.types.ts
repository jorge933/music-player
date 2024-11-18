export interface DownloadDialogProps {
  onDialogClose: (downloadedWithSuccess: boolean) => void;
  snippet: Snippet;
}

export interface Snippet {
  title: string;
  channelTitle: string;
  videoId: string;
  duration: string;
}
