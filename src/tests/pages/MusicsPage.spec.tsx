import { Song } from "@/interfaces/Song";
import { SongService } from "@/services/songService";
import { MusicsPage } from "@/pages/MusicsPage";
import { act, fireEvent, render } from "testUtils";

jest.mock("@/services/songService", () => ({
  SongService: jest.fn(),
}));

describe("MusicsPage", () => {
  beforeEach(() => {
    (SongService as jest.Mock).mockImplementation(() => ({
      getAll: jest.fn().mockReturnValue([]),
    }));
    jest.clearAllMocks();
  });
  it("should render SongItem to each item in songs array", () => {
    const songsMock: Song[] = [
      { title: "Song 1", id: "song_1", duration: 100, path: "" },
      { title: "Song 2", id: "song_2", duration: 100, path: "" },
    ];

    (SongService as jest.Mock).mockImplementation(() => ({
      getAll: jest.fn().mockReturnValue(songsMock),
    }));

    const screen = render(<MusicsPage />);

    songsMock.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeVisible();
    });
  });

  it("should display 'No Songs Downloaded!' when not have downloaded songs", () => {
    const screen = render(<MusicsPage />);
    const message = screen.getByText("No Songs Downloaded!");

    expect(message).toBeVisible();
  });

  it("should display ConfirmDeleteDialog when delete song button is pressed", async () => {
    const songsMock: Song[] = [
      { title: "Song 1", id: "song_1", duration: 100, path: "" },
    ];

    (SongService as jest.Mock).mockImplementation(() => ({
      getAll: jest.fn().mockReturnValue(songsMock),
      getById: jest.fn().mockReturnValue(songsMock[0]),
    }));

    const screen = render(<MusicsPage />);
    const button = screen.getByTestId("deleteSongButton");

    await act(() => {
      fireEvent(button, "press");
    });

    const dialog = screen.getByText("Delete this song?");

    expect(dialog).toBeVisible();
  });
});
