export interface DownloadDialogProps {
  dialogIsOpen: boolean;
  setDialogIsOpen: (newValue: boolean) => void;
  onDialogClose: (downloadedWithSuccess: boolean) => void;
  snippet: Snippet;
}

interface Snippet {
  title: string;
  channelTitle: string;
  videoId: string;
  duration: string;
}
