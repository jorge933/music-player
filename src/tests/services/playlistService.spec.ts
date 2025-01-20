import { useStorage } from "@/hooks/useStorage/useStorage";
import { Playlist, PlaylistOmitted } from "@/interfaces/Playlist";
import { PlaylistService } from "@/services/playlistService";

jest.mock("@/hooks/useStorage/useStorage", () => ({
  useStorage: jest.fn(),
}));

const playlistsMock: Playlist[] = [
  { id: 1, name: "Playlist 1", songs: [] },
  { id: 2, name: "Playlist 2", songs: [] },
  { id: 3, name: "Playlist 3", songs: [] },
];

describe("PlaylistService", () => {
  let service: PlaylistService;

  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useStorage as jest.Mock).mockReturnValue({
      getItem: mockGetItem,
      setItem: mockSetItem,
    });

    service = new PlaylistService();
  });

  it("should retrieve all playlists stored in storage", () => {
    mockGetItem.mockReturnValueOnce(playlistsMock);
    const result = service.getAll();

    expect(mockGetItem).toHaveBeenCalled();
    expect(result).toEqual(playlistsMock);
  });

  it("should return an empty array if no playlists are stored", () => {
    mockGetItem.mockReturnValueOnce(null);

    const result = service.getAll();

    expect(result).toEqual([]);
  });

  it("should return the playlist that matches the provided ID", () => {
    service.getAll = () => playlistsMock;

    const result = service.getById(1);

    expect(result).toEqual(playlistsMock[0]);
  });

  it("should return undefined if no playlist matches the provided ID", () => {
    const result = service.getById(4);

    expect(result).toBeUndefined();
  });

  it("should create a new playlist and update storage", () => {
    const newPlaylist: PlaylistOmitted = { name: "New Playlist" };

    mockGetItem.mockReturnValueOnce(playlistsMock).mockReturnValueOnce(1);

    const service = new PlaylistService();
    service.create(newPlaylist);

    expect(mockGetItem).toHaveBeenCalledWith("playlists");
    expect(mockGetItem).toHaveBeenCalledWith("lastId");
    expect(mockSetItem).toHaveBeenCalledWith("playlists", [
      ...playlistsMock,
      { id: 2, name: "New Playlist", songs: [] },
    ]);
    expect(mockSetItem).toHaveBeenCalledWith("lastId", 2);
  });

  it("should assign unique IDs to each new playlist created consecutively", () => {
    const firstPlaylist: PlaylistOmitted = { name: "Second Playlist" };

    mockGetItem.mockReturnValueOnce(playlistsMock).mockReturnValueOnce(1);

    service.create(firstPlaylist);

    expect(mockSetItem).toHaveBeenCalledWith("playlists", [
      ...playlistsMock,
      { id: 2, name: "Second Playlist", songs: [] },
    ]);
    expect(mockSetItem).toHaveBeenCalledWith("lastId", 2);

    mockGetItem
      .mockReturnValueOnce([
        ...playlistsMock,
        { id: 2, name: "Second Playlist", songs: [] },
      ])
      .mockReturnValueOnce(2);

    const secondPlaylist: PlaylistOmitted = { name: "Third Playlist" };

    service.create(secondPlaylist);

    expect(mockSetItem).toHaveBeenCalledWith("playlists", [
      ...playlistsMock,
      { id: 2, name: "Second Playlist", songs: [] },
      { id: 3, name: "Third Playlist", songs: [] },
    ]);
    expect(mockSetItem).toHaveBeenCalledWith("lastId", 3);
  });

  describe("update", () => {
    it("should update the details of an existing playlist", () => {
      const playlists: Playlist[] = [
        { id: 1, name: "Playlist 1", songs: [] },
        { id: 2, name: "Playlist 2", songs: [] },
      ];
      const updatedPlaylist: Playlist = {
        id: 1,
        name: "Updated Playlist 1",
        songs: [],
      };

      mockGetItem.mockReturnValueOnce(playlists);

      const service = new PlaylistService();
      service.update(updatedPlaylist);

      expect(mockSetItem).toHaveBeenCalledWith("playlists", [
        updatedPlaylist,
        playlists[1],
      ]);
    });

    it("should not make any changes if the playlist ID does not exist", () => {
      const playlists: Playlist[] = [
        { id: 1, name: "Playlist 1", songs: [] },
        { id: 2, name: "Playlist 2", songs: [] },
      ];
      const updatedPlaylist: Playlist = {
        id: 3,
        name: "Nonexistent Playlist",
        songs: [],
      };

      mockGetItem.mockReturnValueOnce(playlists);

      const service = new PlaylistService();
      service.update(updatedPlaylist);

      expect(mockSetItem).toHaveBeenCalledWith("playlists", playlists);
    });
  });

  it("should delete a playlist by its ID", () => {
    const playlists: Playlist[] = [
      { id: 1, name: "Playlist 1", songs: [] },
      { id: 2, name: "Playlist 2", songs: [] },
    ];

    mockGetItem.mockReturnValueOnce(playlists);

    const service = new PlaylistService();
    service.delete(1);

    expect(mockSetItem).toHaveBeenCalledWith("playlists", [playlists[1]]);
  });

  it("should not make any changes if the playlist ID to delete does not exist", () => {
    mockGetItem.mockReturnValueOnce(playlistsMock);

    const service = new PlaylistService();
    service.delete(4);

    expect(mockSetItem).toHaveBeenCalledWith("playlists", playlistsMock);
  });

  it("should add a song to the playlist if it is not already in the playlist", () => {
    const playlistsMock: Playlist[] = [
      { id: 1, name: "Playlist 1", songs: [] },
      { id: 2, name: "Playlist 2", songs: ["song1"] },
    ];

    mockGetItem.mockReturnValueOnce(playlistsMock);

    const service = new PlaylistService();
    service.updateSongList(1, "song2");

    expect(mockSetItem).toHaveBeenCalledWith("playlists", [
      { id: 1, name: "Playlist 1", songs: ["song2"] },
      playlistsMock[1],
    ]);
  });

  it("should remove a song from the playlist if it already exists in the playlist", () => {
    const playlists: Playlist[] = [
      { id: 1, name: "Playlist 1", songs: ["song2"] },
      { id: 2, name: "Playlist 2", songs: ["song1"] },
    ];

    mockGetItem.mockReturnValueOnce(playlists);

    const service = new PlaylistService();
    service.updateSongList(1, "song2");

    expect(mockSetItem).toHaveBeenCalledWith("playlists", [
      { id: 1, name: "Playlist 1", songs: [] },
      playlists[1],
    ]);
  });

  it("should not make any changes if the playlist ID for song modification does not exist", () => {
    const playlists: Playlist[] = [
      { id: 1, name: "Playlist 1", songs: [] },
      { id: 2, name: "Playlist 2", songs: ["song1"] },
    ];

    mockGetItem.mockReturnValueOnce(playlists);

    const service = new PlaylistService();
    service.updateSongList(3, "song3");

    expect(mockSetItem).toHaveBeenCalledWith("playlists", playlists);
  });
});
