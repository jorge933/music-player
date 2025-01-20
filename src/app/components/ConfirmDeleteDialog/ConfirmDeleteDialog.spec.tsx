import { formatSecondsToTime } from "@/helpers/formatSecondsToTime/formatSecondsToTime";
import { PlaylistService } from "@/services/playlist/playlistService";
import { SongService } from "@/services/song/songService";
import { fireEvent, render } from "testUtils";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { ConfirmDeleteDialogProps } from "./ConfirmDeleteDialog.types";
import { useToastsContext } from "@/hooks/useToastsContext/useToastsContext";

jest.mock("@/hooks/useToastsContext/useToastsContext", () => ({
  useToastsContext: jest.fn().mockReturnValue({
    info: jest.fn(),
    success: jest.fn(),
  }),
}));

const songMock = {
  duration: 100,
  path: "",
  title: "Song 1",
};

const songServiceMock = new SongService();

songServiceMock.getById = (id) => ({ ...songMock, id });

const playlistMock = {
  name: "Playlist 1",
  songs: [],
};

const playlistServiceMock = new PlaylistService();

playlistServiceMock.getById = (id) => ({ ...playlistMock, id });

const baseProperties: ConfirmDeleteDialogProps = {
  closeDialog: jest.fn(),
  id: 1,
  service: playlistServiceMock,
  testID: "confirm-delete-dialog",
};

describe("ConfirmDeleteDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render title 'Delete this playlist?' when PlaylistService is passed", () => {
    const { getByText } = render(<ConfirmDeleteDialog {...baseProperties} />);

    const title = getByText("Delete this playlist?");

    expect(title).toBeVisible();
  });
  it("should render title 'Delete this song?' when SongService is passed", () => {
    const { getByText } = render(
      <ConfirmDeleteDialog {...baseProperties} service={songServiceMock} />,
    );

    const title = getByText("Delete this song?");

    expect(title).toBeVisible();
  });

  it("should render SongItem when SongService is passed", () => {
    const { getByText } = render(
      <ConfirmDeleteDialog {...baseProperties} service={songServiceMock} />,
    );

    const formattedDuration = formatSecondsToTime(songMock.duration);

    const title = getByText(songMock.title);
    const duration = getByText(formattedDuration);

    expect(title).toBeVisible();
    expect(duration).toBeVisible();
  });

  it("should close dialog and call delete method on press delete button", () => {
    const deleteMethodMock = jest.fn();
    const closeDialogMock = jest.fn();
    const onDeleteItemMock = jest.fn();

    songServiceMock.delete = deleteMethodMock;

    const { getByTestId } = render(
      <ConfirmDeleteDialog
        {...baseProperties}
        service={songServiceMock}
        closeDialog={closeDialogMock}
        onDeleteItem={onDeleteItemMock}
      />,
    );

    const deleteButton = getByTestId("delete-button");

    fireEvent(deleteButton, "press");

    expect(deleteMethodMock).toHaveBeenCalledWith(baseProperties.id);
    expect(closeDialogMock).toHaveBeenCalledWith(false);
    expect(onDeleteItemMock).toHaveBeenCalled();
  });

  it("should close dialog on press cancel button", () => {
    const closeDialogMock = jest.fn();

    const { getByTestId } = render(
      <ConfirmDeleteDialog
        {...baseProperties}
        service={songServiceMock}
        closeDialog={closeDialogMock}
      />,
    );

    const deleteButton = getByTestId("cancel-button");

    fireEvent(deleteButton, "press");

    expect(closeDialogMock).toHaveBeenCalledWith(false);
  });

  it("should show success toast with message 'Playlist deleted with success' on delete playlist", () => {
    const success = jest.fn();

    (useToastsContext as jest.Mock).mockReturnValue({ success });

    const { getByTestId } = render(<ConfirmDeleteDialog {...baseProperties} />);

    const deleteButton = getByTestId("delete-button");

    fireEvent(deleteButton, "press");

    const toastMessage = "Playlist deleted with success";
    expect(success).toHaveBeenCalledWith(toastMessage, expect.any(Number));
  });

  it("should show success toast with message 'Song deleted with success' on delete song", () => {
    const success = jest.fn();

    (useToastsContext as jest.Mock).mockReturnValue({ success });

    const { getByTestId } = render(
      <ConfirmDeleteDialog {...baseProperties} service={songServiceMock} />,
    );

    const deleteButton = getByTestId("delete-button");

    fireEvent(deleteButton, "press");

    const toastMessage = "Song deleted with success";
    expect(success).toHaveBeenCalledWith(toastMessage, expect.any(Number));
  });

  it("should show info toast with message 'Playlist not deleted' on cancel delete playlist", () => {
    const info = jest.fn();

    (useToastsContext as jest.Mock).mockReturnValue({ info });

    const { getByTestId } = render(<ConfirmDeleteDialog {...baseProperties} />);

    const deleteButton = getByTestId("cancel-button");

    fireEvent(deleteButton, "press");

    const toastMessage = "Playlist not deleted";
    expect(info).toHaveBeenCalledWith(toastMessage, expect.any(Number));
  });

  it("should show info toast with message 'Song not deleted' on cancel delete song", () => {
    const info = jest.fn();

    (useToastsContext as jest.Mock).mockReturnValue({ info });

    const { getByTestId } = render(
      <ConfirmDeleteDialog {...baseProperties} service={songServiceMock} />,
    );

    const deleteButton = getByTestId("cancel-button");

    fireEvent(deleteButton, "press");

    const toastMessage = "Song not deleted";
    expect(info).toHaveBeenCalledWith(toastMessage, expect.any(Number));
  });
});
