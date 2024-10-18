export interface DownloadDialogProps {
  dialogIsOpen: boolean;
  setDialogIsOpen: (newValue: boolean) => void;
  setDisabled: (newValue: boolean) => void;
  snippet: Snippet;
}

interface Snippet {
  title: string;
  channelTitle: string;
  videoId: string;
}
