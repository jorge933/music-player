import { SongService } from "@/services/songService";
import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { FileSystemService } from "@/services/fileSystemService";
import axios from "axios";
import { FileInfo } from "expo-file-system";

jest.mock("@/hooks/useStorage/useStorage", () => ({
  useStorage: jest.fn(),
}));
jest.mock("../fileSystem/fileSystemService", () => ({
  FileSystemService: {
    getInfo: jest.fn().mockResolvedValue({ exists: true }),
    delete: jest.fn(),
    createDirectory: jest.fn(),
    writeFile: jest.fn(),
  },
}));
jest.mock("axios");
jest.mock("@/helpers/getEnvironmentVariables", () => ({
  getEnvironmentVariables: jest.fn(() => ({
    SERVER_URL: "http://mock-server.com",
  })),
}));

describe("SongService", () => {
  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();

  const mockSongs = [
    { id: "1", title: "Song 1", path: "/path/song1.mp3", duration: 100 },
    { id: "2", title: "Song 2", path: "/path/song2.mp3", duration: 100 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    const { useStorage } = require("@/hooks/useStorage/useStorage");

    (useStorage as jest.Mock).mockReturnValue({
      getItem: mockGetItem,
      setItem: mockSetItem,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all songs", () => {
    mockGetItem.mockReturnValueOnce(mockSongs);

    const service = new SongService();
    const result = service.getAll();

    expect(result).toEqual(mockSongs);
  });

  it("should return an empty array if no songs are stored", () => {
    mockGetItem.mockReturnValueOnce(null);

    const service = new SongService();
    const result = service.getAll();

    expect(result).toEqual([]);
  });

  it("should return a song by ID", () => {
    mockGetItem.mockReturnValueOnce(mockSongs);

    const service = new SongService();
    const result = service.getById("1");

    expect(result).toEqual(mockSongs[0]);
  });

  it("should return undefined if song ID is not found", () => {
    mockGetItem.mockReturnValueOnce(mockSongs);

    const service = new SongService();
    const result = service.getById("3");

    expect(result).toBeUndefined();
  });

  it("should delete a song and update storage", () => {
    mockGetItem.mockReturnValueOnce(mockSongs);

    const service = new SongService();
    service.delete("1");

    expect(FileSystemService.delete).toHaveBeenCalledWith("/path/song1.mp3");
    expect(mockSetItem).toHaveBeenCalledWith("songs", [mockSongs[1]]);
  });

  it("should not delete a song if ID is not found", () => {
    mockGetItem.mockReturnValueOnce(mockSongs);

    const service = new SongService();
    service.delete("3");

    expect(FileSystemService.delete).not.toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalledWith("songs", mockSongs);
  });

  it("should make a request to download a song buffer", () => {
    const postMock = jest.fn();
    (axios.post as jest.Mock).mockImplementation(postMock);

    const service = new SongService();
    const { abort } = service.requestSongBuffer("video123");

    expect(postMock).toHaveBeenCalledWith(
      "http://mock-server.com/download",
      { videoId: "video123" },
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(abort).toStrictEqual(expect.any(Function));
  });

  it("should create a song file and return its path", async () => {
    const createDirectoryMock = jest.fn();
    const writeFileMock = jest.fn();
    jest
      .spyOn(FileSystemService, "getInfo")
      .mockResolvedValue({ exists: false } as FileInfo);
    jest
      .spyOn(FileSystemService, "createDirectory")
      .mockImplementation(createDirectoryMock);
    (FileSystemService.writeFile as jest.Mock).mockImplementation(
      writeFileMock,
    );

    const service = new SongService();
    const path = await service.createSongFile("songData", "song123");

    expect(createDirectoryMock).toHaveBeenCalledWith(SONGS_DIRECTORY);
    expect(writeFileMock).toHaveBeenCalledWith(
      SONGS_DIRECTORY + "song123.mp3",
      "songData",
    );
    expect(path).toBe(SONGS_DIRECTORY + "song123.mp3");
  });

  it("should save a song to storage", () => {
    const newSong = {
      id: "3",
      title: "Song 3",
      path: "/path/song3.mp3",
      duration: 100,
    };
    mockGetItem.mockReturnValueOnce(mockSongs);

    const service = new SongService();
    service.saveSong(newSong);

    const calls = JSON.stringify(mockSetItem.mock.calls[0]);
    console.log(calls);

    expect(mockSetItem).toHaveBeenCalledWith(
      "songs",
      expect.arrayContaining([...mockSongs, newSong]),
    );
  });
});
