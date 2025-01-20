import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";
import {
  DownloadItem,
  ItemStatus,
} from "@/contexts/download/downloadContext.types";
import { SongService } from "@/services/songService";
import { useState } from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

function changeItemStatus(
  item: DownloadItem,
  videoId: string,
  newStatus: ItemStatus,
): DownloadItem {
  const isVideo = item.videoId === videoId;

  if (!isVideo) return item;

  return { ...item, status: newStatus };
}

function downloadSong(
  details: VideoDetails,
  setQueue: SetState<DownloadItem[]>,
  songService: SongService,
) {
  const { videoId, title, duration } = details;

  let aborted = false;

  const { request, abort } = songService.requestSongBuffer(videoId);

  const abortRequest = () => {
    abort();
    aborted = true;

    setQueue((prev) =>
      prev.map((item) => changeItemStatus(item, videoId, ItemStatus.CANCELED)),
    );
  };

  const newItemObj: DownloadItem = {
    ...details,
    abort: abortRequest,
    status: ItemStatus.DOWNLOADING,
  };
  setQueue((prev) => {
    const alreadyInQueue = prev.find(
      ({ videoId: id }) => id === details.videoId,
    );

    if (alreadyInQueue)
      return prev.map((item) =>
        item.videoId === details.videoId ? newItemObj : item,
      );

    return [...prev, newItemObj];
  });

  const handleError = () => {
    if (aborted) return;

    setQueue((prev) =>
      prev.map((item) => changeItemStatus(item, videoId, ItemStatus.ERROR)),
    );
  };

  request
    .then(async ({ data }) => {
      try {
        const path = await songService.createSongFile(data, videoId);
        const newSong = { path, id: videoId, duration, title };

        songService.saveSong(newSong);

        setQueue((prev) =>
          prev.map((item) =>
            changeItemStatus(item, videoId, ItemStatus.FINISHED),
          ),
        );
      } catch (error) {
        handleError();
      }
    })
    .catch(handleError);
}

function removeFromQueue(id: string, setQueue: SetState<DownloadItem[]>) {
  setQueue((prev) => prev.filter(({ videoId }) => id !== videoId));
}

export function useDownloadManager() {
  const [queue, setQueue] = useState<DownloadItem[]>([]);
  const songService = new SongService();

  return {
    queue,
    downloadSong: (details: VideoDetails) =>
      downloadSong(details, setQueue, songService),
    removeFromQueue: (id: string) => removeFromQueue(id, setQueue),
  };
}
