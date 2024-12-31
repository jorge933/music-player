import { DownloadSongContext } from "@/contexts/downloadContext/downloadContext";
import { DownloadContextType } from "@/contexts/downloadContext/downloadContext.types";
import { useContext } from "react";

export function useDownloadContext() {
  const downloadManager = useContext(
    DownloadSongContext,
  ) as DownloadContextType;

  return downloadManager;
}
