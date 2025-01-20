import { SongService } from "@/services/songService";
import { fireEvent, render } from "testUtils";
import { AddSongDialog } from "@/components/AddSongDialog/AddSongDialog";
import { PlaylistService } from "@/services/playlistService";
import { Playlist } from "@/interfaces/Playlist";
import { Song } from "@/interfaces/Song";
import { COLORS } from "@/constants/Colors";

jest.mock("@/services/playlist/playlistService");
jest.mock("@/services/song/songService");

const songsMock: Song[] = [
  { duration: 100, id: "song_1", path: "", title: "Song 1" },
  { duration: 100, id: "song_2", path: "", title: "Song 2" },
  { duration: 100, id: "song_3", path: "", title: "Song 3" },
];
const playlistsMock: Playlist[] = [
  { id: 1, name: "Playlist 1", songs: ["song_1"] },
  { id: 2, name: "Playlist 2", songs: ["song_1"] },
  { id: 3, name: "Playlist 3", songs: ["song_1"] },
];
const defaultProps = { playlistId: 1, setOpen: () => {} };

describe("AddSongDialog", () => {
  beforeEach(() => {
    jest.spyOn(SongService.prototype, "getAll").mockReturnValue(songsMock);
    jest
      .spyOn(PlaylistService.prototype, "getAll")
      .mockReturnValue(playlistsMock);
  });

  it("should render songs", () => {
    const { getByText } = render(<AddSongDialog {...defaultProps} />);

    songsMock.forEach(({ title }) => {
      expect(getByText(title)).toBeVisible();
    });
  });

  it("renders the action button with the correct state for added songs", () => {
    const { getAllByTestId } = render(<AddSongDialog {...defaultProps} />);

    const [checkedButton, uncheckedButton] = getAllByTestId("button");

    expect(checkedButton).toBeVisible();
    expect(checkedButton.props.icon.props.name).toBe("playlist-add-check");
    expect(checkedButton.props.icon.props.color).toBe(COLORS.green);

    expect(uncheckedButton).toBeVisible();
    expect(uncheckedButton.props.icon.props.name).toBe("playlist-add");
    expect(uncheckedButton.props.icon.props.color).toBe(COLORS.white);
  });

  it("calls updatePlaylistSongs when the button is pressed", () => {
    const updateSongListMock = jest.fn();

    PlaylistService.prototype.updateSongList = updateSongListMock;

    const { getAllByTestId } = render(<AddSongDialog {...defaultProps} />);

    const button = getAllByTestId("button")[1];

    fireEvent(button, "press");

    expect(updateSongListMock).toHaveBeenCalledWith(1, "song_2");
  });

  it("calls onDialogClose on close dialog", () => {
    const onDialogCloseMock = jest.fn();
    const setOpenMock = jest.fn();

    const { getByTestId } = render(
      <AddSongDialog
        {...defaultProps}
        onClose={onDialogCloseMock}
        setOpen={setOpenMock}
      />,
    );

    const closeDialogIcon = getByTestId("close-dialog-icon");

    fireEvent(closeDialogIcon, "press");

    expect(onDialogCloseMock).toHaveBeenCalled();
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });
});
