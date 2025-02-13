import { VideoDetails } from "@/contexts";

export interface DownloadDialogProps {
  onDialogClose: (downloadedWithSuccess: boolean) => void;
  videoDetails: VideoDetails;
}
