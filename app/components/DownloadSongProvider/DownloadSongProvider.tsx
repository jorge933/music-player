import { DownloadSongContext } from "@/contexts/downloadContext/downloadContext";
import { DownloadItem } from "@/contexts/downloadContext/downloadContext.types";
import { SongService } from "@/services/songService/songService";
import { ReactNode, useEffect, useState } from "react";
import { VideoDetails } from "../DownloadDialog/DownloadDialog.types";
import { downloadSong } from "@/hooks/useDownloadManager/useDownloadManager";

export function DownloadSongProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<DownloadItem[]>([]);
  const songService = new SongService();

  useEffect(() => {
    console.log(queue);
  }, [queue]);

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
