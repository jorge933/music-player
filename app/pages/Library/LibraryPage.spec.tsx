import { Playlist } from "@/interfaces/Playlist";
import { PlaylistService } from "@/services/playlist/playlistService";
import { useRouter } from "expo-router";
import { fireEvent, render } from "testUtils";
import { LibraryPage } from "./LibraryPage";

jest.mock("@/services/playlistService/playlistService", () => ({
  PlaylistService: jest.fn().mockImplementation(() => ({
    getAll: jest.fn().mockReturnValue([]),
  })),
}));

jest.mock("expo-router", () => ({ useRouter: jest.fn() }));

describe.only("LibraryPage", () => {
  it("should display 'No Playlists Created!' message", () => {
    const screen = render(<LibraryPage />);

    const text = screen.getByText("No Playlists Created!");
    expect(text).toBeVisible();
  });

  it("should render a PlaylistCard for each playlist", () => {
    const playlistsMock: Playlist[] = [
      { id: 1, name: "Playlist 1", songs: [] },
      { id: 2, name: "Playlist 2", songs: [] },
    ];
    const mockPlaylistService = {
      getAll: jest.fn().mockReturnValue(playlistsMock),
    };

    (PlaylistService as jest.Mock).mockImplementation(
      () => mockPlaylistService,
    );

    const screen = render(<LibraryPage />);

    playlistsMock.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeVisible();
    });
  });

  it("should display PlaylistFormDialog when pressing the create playlist button", () => {
    const screen = render(<LibraryPage />);
    const button = screen.getByTestId("createPlaylist");

    fireEvent(button, "press");

    const dialog = screen.getByText("Create Playlist");

    expect(dialog).toBeVisible();
  });

  it("should navigate to the musics page when pressing the corresponding button", () => {
    const navigateMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });

    const screen = render(<LibraryPage />);
    const button = screen.getByTestId("navigateToMusicsPage");

    fireEvent(button, "press");

    expect(navigateMock).toHaveBeenCalledWith("/musics");
  });
});
