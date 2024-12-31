import { DownloadSongContext } from "@/contexts/downloadContext/downloadContext";
import { DownloadItem } from "@/contexts/downloadContext/downloadContext.types";
import { downloadSong } from "@/hooks/useDownloadManager/useDownloadManager";
import { SongService } from "@/services/songService/songService";
import { ReactNode, useState } from "react";
import { VideoDetails } from "../DownloadDialog/DownloadDialog.types";

export function DownloadSongProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<DownloadItem[]>([]);
  const songService = new SongService();

  return (
    <DownloadSongContext.Provider
      value={{
        queue,
        downloadSong: (details: VideoDetails) =>
          downloadSong(details, setQueue, songService),
      }}
    >
      {children}
    </DownloadSongContext.Provider>
  );
}
