import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";
import { ItemStatus } from "@/contexts/download/downloadContext.types";
import { SongService } from "@/services/songService";
import { act, renderHook } from "testUtils";
import { useDownloadManager } from "@/hooks/useDownloadManager/useDownloadManager";

jest.mock("@/services/songService", () => ({
  SongService: jest.fn(() => ({
    requestSongBuffer: jest.fn(() => ({
      request: new Promise(() => {}),
      abort: jest.fn(),
    })),
    createSongFile: jest.fn(),
    saveSong: jest.fn(),
  })),
}));

const videoDetailsMock: VideoDetails = {
  videoId: "videoId",
  title: "Test Video",
  duration: 300,
  channelTitle: "Channel",
};

describe("useDownloadManager", () => {
  it("should add an item to the queue with DOWNLOADING status", async () => {
    (SongService as jest.Mock).mockImplementation(() => ({
      requestSongBuffer: () => ({
        request: new Promise(() => {}),
        abort: jest.fn(),
      }),
    }));

    const { result } = renderHook(useDownloadManager);

    await act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    const expectedQueue = [
      {
        ...videoDetailsMock,
        status: ItemStatus.DOWNLOADING,
        abort: expect.any(Function),
      },
    ];

    const queue = result.current.queue;

    expect(queue).toEqual(expectedQueue);
  });

  it("should call createSongFile on request success", async () => {
    const createSongFile = jest.fn();

    (SongService as jest.Mock).mockImplementation(() => ({
      requestSongBuffer: () => ({
        abort: jest.fn(),
        request: new Promise((resolve) => resolve({ data: "song buffer" })),
      }),
      createSongFile,
      saveSong: jest.fn(),
    }));

    const { result } = renderHook(useDownloadManager);

    await act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    expect(createSongFile).toHaveBeenCalledWith(
      "song buffer",
      videoDetailsMock.videoId,
    );
  });

  it("should call saveSong on request success", async () => {
    const path = "song-path";
    const saveSong = jest.fn();

    (SongService as jest.Mock).mockImplementation(() => ({
      requestSongBuffer: () => ({
        abort: jest.fn(),
        request: new Promise((resolve) => resolve({ data: "song buffer" })),
      }),
      createSongFile: jest.fn().mockResolvedValue(path),
      saveSong,
    }));

    const { result } = renderHook(useDownloadManager);

    await act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    const expectedObj = {
      id: videoDetailsMock.videoId,
      title: videoDetailsMock.title,
      duration: videoDetailsMock.duration,
      path,
    };

    expect(saveSong).toHaveBeenCalledWith(expectedObj);
  });

  it("should add an item to the queue with DOWNLOADING status", () => {
    const { result } = renderHook(useDownloadManager);

    act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    const expectedQueue = [
      {
        ...videoDetailsMock,
        status: ItemStatus.DOWNLOADING,
        abort: expect.any(Function),
      },
    ];

    const queue = result.current.queue;

    expect(queue).toEqual(expectedQueue);
  });

  it("should change status to CANCELED when abort function is called", () => {
    const { result } = renderHook(useDownloadManager);

    act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    act(() => {
      const queue = result.current.queue;
      const [addedItem] = queue;

      addedItem.abort();
    });

    const [addedItem] = result.current.queue;

    expect(addedItem.status).toBe(ItemStatus.CANCELED);
  });

  it("should set the status to ERROR when requestSongBuffer fails", async () => {
    (SongService as jest.Mock).mockImplementation(() => ({
      requestSongBuffer: () => ({
        abort: jest.fn(),
        request: new Promise((resolve, reject) => reject()),
      }),
    }));

    const { result } = renderHook(useDownloadManager);

    await act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    const [addedItem] = result.current.queue;

    expect(addedItem.status).toBe(ItemStatus.ERROR);
  });

  it("should set the status to ERROR when createSongFile fails", async () => {
    (SongService as jest.Mock).mockImplementation(() => ({
      requestSongBuffer: () => ({
        abort: jest.fn(),
        request: new Promise((resolve) => resolve({ data: "" })),
      }),
      createSongFile: jest.fn(() => new Promise((resolve, reject) => reject())),
      saveSong: jest.fn(),
    }));

    const { result } = renderHook(useDownloadManager);

    await act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    const [addedItem] = result.current.queue;

    expect(addedItem.status).toBe(ItemStatus.ERROR);
  });

  it("should remove item from queue", () => {
    const { result } = renderHook(useDownloadManager);

    act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    const expectedQueue = [
      {
        ...videoDetailsMock,
        status: ItemStatus.DOWNLOADING,
        abort: expect.any(Function),
      },
    ];

    expect(result.current.queue).toEqual(expectedQueue);

    act(() => {
      result.current.removeFromQueue(videoDetailsMock.videoId);
    });

    expect(result.current.queue).toEqual([]);
  });

  it("queue should not modify if passed incorrect", async () => {
    const { result } = renderHook(useDownloadManager);

    act(() => {
      result.current.downloadSong(videoDetailsMock);
    });

    await act(() => {
      result.current.removeFromQueue("incorrect id");
    });

    expect(result.current.queue).toHaveLength(1);
  });
});
