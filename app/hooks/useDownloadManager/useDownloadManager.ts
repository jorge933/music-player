import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";
import {
  DownloadItem,
  ItemStatus,
} from "@/contexts/downloadContext/downloadContext.types";
import { SongService } from "@/services/songService/songService";

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

export function downloadSong(
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
  };

  const newItemObj: DownloadItem = {
    ...details,
    abort: abortRequest,
    status: "downloading",
  };
  setQueue((prev) => [...prev, newItemObj]);

  const handleError = () => {
    if (aborted) return;

    setQueue((prev) =>
      prev.map((item) => changeItemStatus(item, videoId, "error")),
    );
  };

  request
    .then(async ({ data }) => {
      try {
        const path = await songService.createSongFile(data, videoId);
        const newSong = { path, id: videoId, duration, title };

        songService.saveSong(newSong);

        setQueue((prev) =>
          prev.map((item) => changeItemStatus(item, videoId, "finished")),
        );
      } catch (error) {
        handleError();
      }
    })
    .catch(handleError);
}
