import { DownloadSongContext } from "@/contexts/downloadContext/downloadContext";
import { useDownloadManager } from "@/hooks/useDownloadManager/useDownloadManager";
import { ReactNode } from "react";

export function DownloadSongProvider({ children }: { children: ReactNode }) {
  const downloadManager = useDownloadManager();

  return (
    <DownloadSongContext.Provider value={downloadManager}>
      {children}
    </DownloadSongContext.Provider>
  );
}
