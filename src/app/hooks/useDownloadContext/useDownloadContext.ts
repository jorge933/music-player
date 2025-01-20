import { DownloadSongContext } from "@/contexts/download/downloadContext";
import { DownloadContextType } from "@/contexts/download/downloadContext.types";
import { useContext } from "react";

export function useDownloadContext() {
  const downloadManager = useContext(
    DownloadSongContext,
  ) as DownloadContextType;

  return downloadManager;
}
