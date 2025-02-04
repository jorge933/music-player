import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";
import {
  DownloadItem,
  ItemStatus,
} from "@/contexts/download/downloadContext.types";
import { SongService } from "@/services/songService";
import { useState } from "react";
import { useToastsContext } from "../useToastsContext/useToastsContext";

class DownloadManager {
  private readonly songService = new SongService();
  private readonly state = useState<DownloadItem[]>([]);
  readonly queue = this.state[0];
  private readonly setQueue = this.state[1];
  private readonly toasts = useToastsContext();

  removeFromQueue(id: string) {
    this.setQueue((prev) => prev.filter(({ videoId }) => id !== videoId));
  }

  downloadSong(details: VideoDetails) {
    const { videoId, title, duration } = details;

    const { request, abort } = this.songService.requestSongBuffer(videoId);

    const abortRequest = () => {
      abort();

      this.changeItemStatus(videoId, ItemStatus.CANCELED);
    };
    const newItemObj: DownloadItem = {
      ...details,
      abort: abortRequest,
      status: ItemStatus.DOWNLOADING,
    };

    this.addItemInQueue(newItemObj);

    request
      .then(async ({ data }) => {
        try {
          const path = await this.songService.createSongFile(data, videoId);
          const newSong = { path, id: videoId, duration, title };

          this.songService.saveSong(newSong);

          this.changeItemStatus(videoId, ItemStatus.FINISHED);
        } catch (error) {
          this.handleDownloadError(details.videoId, error);
        }
      })
      .catch((error) => this.handleDownloadError(details.videoId, error));
  }

  private changeItemStatus(videoId: string, newStatus: ItemStatus) {
    this.setQueue((queue) => {
      const queueUpdated = queue.map((item) => {
        const isVideo = item.videoId === videoId;

        if (!isVideo) return item;

        return { ...item, status: newStatus };
      });

      return queueUpdated;
    });
  }

  private addItemInQueue(newItem: DownloadItem) {
    this.setQueue((prev) => {
      const alreadyInQueue = prev.find(
        ({ videoId: id }) => id === newItem.videoId,
      );

      if (alreadyInQueue)
        return prev.map((item) =>
          item.videoId === newItem.videoId ? newItem : item,
        );

      return [...prev, newItem];
    });

    const { title } = newItem;
    const formattedTitle =
      title.length > 20 ? `${title.slice(0, 19)}...` : title;

    this.toasts.success(`Added ${formattedTitle} in download queue`, 5000);
  }

  private handleDownloadError(id: string, error: any) {
    const errorInString = String(error).toString();
    const regex = /cancel/gi;

    const isCanceled = regex.test(errorInString);

    if (isCanceled) return;

    this.changeItemStatus(id, ItemStatus.ERROR);
  }
}

export function useDownloadManager() {
  const downloadManager = new DownloadManager();

  return downloadManager;
}
